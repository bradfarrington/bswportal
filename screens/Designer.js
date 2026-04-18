import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
  ActivityIndicator, Image, Dimensions, Platform, TextInput, Modal,
  KeyboardAvoidingView, Alert, LayoutAnimation, UIManager, Animated,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import { SvgXml } from 'react-native-svg';
import {
  getStoredImageUrl, findHeading, getSelectedDescription,
  OptionCategories, WIZARD_STEPS as API_WIZARD_STEPS, EMPTY_GUID_VALUE,
  generateStartDoorJS, generateUpdateOptionJS,
  generateToggleViewJS, generateSubmitEnquiryJS,
  SESSION_PAGE_URL, IMAGE_BASE_URL,
} from '../utils/DoorDesignerApi';
import {
  loadAllDesignerData, getStylesForRange,
  WIZARD_STEPS as LOCAL_WIZARD_STEPS,
} from '../data/DoorDesignerData';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TILE_GAP = 10;
const TILES_PER_ROW = 3;
const TILE_WIDTH = (SCREEN_WIDTH - 40 - TILE_GAP * (TILES_PER_ROW - 1)) / TILES_PER_ROW;

// Step categories that show large door slab thumbnails (2-column)
const LARGE_TILE_CATEGORIES = [
  OptionCategories.DoorDesign,
  OptionCategories.DoorColourExternal,
  OptionCategories.DoorColourInternal,
  OptionCategories.DoorGlass,
];

// The finish/summary step comes after all wizard steps
const FINISH_STEP = LOCAL_WIZARD_STEPS.length + 1; // 13

const Skeleton = ({ width, height, style, borderRadius = 8 }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View style={[{ width, height, borderRadius, backgroundColor: '#E5E7EB', opacity }, style]} />
  );
};

// Wait for all images in a step to be cached before revealing
const collectStepImageUrls = (stepId, jobData, localDataRef) => {
  const urls = [];

  const collectForCategory = (catId) => {
    // From local Supabase data
    if (localDataRef?.options?.[catId]) {
      localDataRef.options[catId].forEach(opt => {
        if (opt.image_url && !opt.valid_but_hidden) urls.push(opt.image_url);
      });
    }
    // From API job headings
    if (jobData?.Headings) {
      const heading = jobData.Headings.find(h => h.HeadingTypeID === catId);
      if (heading?.Options) {
        heading.Options.forEach(opt => {
          if (!opt.ValidButHidden) {
            const url = opt.image_url || (opt.StoredImageID && opt.StoredImageID !== EMPTY_GUID_VALUE ? getStoredImageUrl(opt.StoredImageID, jobData.ImageLibraryVersion) : null);
            if (url) urls.push(url);
          }
        });
      }
    }
  };

  const idx = stepId - 1;
  if (idx >= 0 && idx < LOCAL_WIZARD_STEPS.length) {
    collectForCategory(LOCAL_WIZARD_STEPS[idx].category);
  }

  return [...new Set(urls)];
};

const Designer = () => {
  // Core state
  const [job, setJob] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState(false);
  const [error, setError] = useState(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [previewRendering, setPreviewRendering] = useState(false);
  const [stepReady, setStepReady] = useState(false);  // Gate: only show options when images loaded

  // Local Supabase data
  const [localData, setLocalData] = useState(null);  // { categories, options }
  const [localSelections, setLocalSelections] = useState({});  // { categoryId: optionOriginalId }
  const [localDataReady, setLocalDataReady] = useState(false);

  // Enquiry modal
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '', email: '', postcode: '', phone: '', feedback: ''
  });
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Hardware sub-menu (in finish step)
  const [hardwareSection, setHardwareSection] = useState(null);

  // View toggle
  const [viewedFromInside, setViewedFromInside] = useState(false);

  // Refs
  const stepsScrollRef = useRef(null);
  const apiWebViewRef = useRef(null);  // Hidden WebView for API calls
  const svgWebViewRef = useRef(null);  // Visible WebView for SVG preview
  const pendingCallbackRef = useRef(null);

  // Load local data from Supabase on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await loadAllDesignerData();
        setLocalData(data);
        setLocalDataReady(true);
        setLoading(false);
        console.log('[DoorDesigner] Local data ready');
      } catch (err) {
        console.error('[DoorDesigner] Failed to load local data:', err);
        // Fall back to API-only mode
      }
    })();
  }, []);

  // Gate: wait for all images in the current step to be cached before revealing
  useEffect(() => {
    if (!localDataReady || !job) return;
    
    setStepReady(false);
    const urls = collectStepImageUrls(currentStep, job, localData);
    
    if (urls.length === 0) {
      // No images to load (e.g. finish step, text-only steps)
      setStepReady(true);
      return;
    }

    console.log(`[DoorDesigner] Waiting for ${urls.length} images on step ${currentStep}...`);
    
    // Load all images, then reveal
    Promise.all(urls.map(url => Image.prefetch(url).catch(() => null)))
      .then(() => {
        console.log(`[DoorDesigner] Step ${currentStep} images ready!`);
        setStepReady(true);
        
        // Also quietly start prefetching the NEXT step in the background
        if (currentStep < LOCAL_WIZARD_STEPS.length) {
          const nextUrls = collectStepImageUrls(currentStep + 1, job, localData);
          nextUrls.forEach(url => Image.prefetch(url).catch(() => {}));
        }
      });
  }, [currentStep, job, localDataReady, hardwareSection]);

  // When the hidden WebView loads the ASPX page, trigger StartDoor
  const handleSessionPageLoaded = () => {
    console.log('[DoorDesigner] Session page loaded, calling StartDoor...');
    setSessionReady(true);
    apiWebViewRef.current?.injectJavaScript(generateStartDoorJS());
  };

  // Handle messages from the hidden WebView (API responses)
  const handleApiMessage = (event) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      console.log(`[DoorDesigner] API response: ${msg.type}, responseType: ${msg.responseType}`);

      // Error handling
      if (msg.responseType === -1) {
        console.error(`[DoorDesigner] ${msg.type} fetch error:`, msg.message);
        setSelecting(false);
        setLoading(false);
        if (msg.type === 'StartDoor') {
          setError('Failed to connect. Please try again.');
        } else {
          Alert.alert('Error', msg.message || 'Request failed.');
        }
        return;
      }

      if (msg.responseType === 0) {
        console.error(`[DoorDesigner] ${msg.type} service error:`, msg.message);
        setSelecting(false);
        setLoading(false);
        Alert.alert('Error', msg.message || 'Something went wrong.');
        return;
      }

      if (msg.responseType === 1) {
        // Session expired
        setError('Session expired. Please restart the designer.');
        setLoading(false);
        setSelecting(false);
        return;
      }

      // Success (responseType 2 or 3)
      switch (msg.type) {
        case 'StartDoor':
          handleStartDoorResult(msg.data);
          break;
        case 'UpdateOption':
          handleUpdateOptionResult(msg.data);
          break;
        case 'ToggleViewPosition':
          handleToggleResult(msg.data);
          break;
        case 'SubmitEnquiry':
          handleEnquiryResult(msg);
          break;
      }
    } catch (err) {
      console.error('[DoorDesigner] Failed to parse API message:', err);
    }
  };

  const handleStartDoorResult = (data) => {
    console.log('[DoorDesigner] StartDoor success, headings:', data?.Headings?.length);
    setJob(data);
    // If local data is already loaded, don't reset the step
    if (!localDataReady) {
      setCurrentStep(1);
      setLoading(false);
    }
    setHardwareSection(null);
    setViewedFromInside(false);
    setError(null);
    
    // Prefetch next step images in background
    const nextStepIdx = currentStep;
    if (nextStepIdx < LOCAL_WIZARD_STEPS.length) {
      const nextUrls = collectStepImageUrls(nextStepIdx + 1, data, localData);
      nextUrls.forEach(url => Image.prefetch(url).catch(() => {}));
    }
  };

  const handleUpdateOptionResult = (data) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setJob(data);
    setSelecting(false);

    // If we're in the finish step hardware sub-menu, go back to finish
    if (currentStep === FINISH_STEP && hardwareSection) {
      setHardwareSection(null);
      return;
    }

    // Auto-advance to next step
    const nextStep = getNextStep(currentStep, data);
    if (nextStep !== currentStep) {
      setCurrentStep(nextStep);
      scrollToStep(nextStep);
    }
    
    // Step changed — stepReady will be handled by the useEffect
  };

  const handleToggleResult = (data) => {
    setJob(data);
    setViewedFromInside(data.ViewedFromInside);
    setSelecting(false);
  };

  const handleEnquiryResult = (msg) => {
    setEnquirySubmitting(false);
    if (msg.responseType === 2) {
      setEnquirySuccess(true);
    } else {
      Alert.alert('Error', msg.message || 'Failed to submit enquiry.');
    }
  };

  // Select an option via the WebView bridge
  const handleSelectOption = (categoryId, optionId, dataLinkID = EMPTY_GUID_VALUE) => {
    // Update local selection immediately (instant UI feedback)
    setLocalSelections(prev => ({ ...prev, [categoryId]: optionId }));

    // If it's a range selection, load styles for that range
    if (categoryId === 66) {
      loadStylesForSelectedRange(optionId);
    }

    // Also send to WebView bridge for SVG update
    setSelecting(true);
    setPreviewRendering(true);
    const js = generateUpdateOptionJS(categoryId, optionId, dataLinkID);
    apiWebViewRef.current?.injectJavaScript(js);
  };

  // Load door styles when a range is selected
  const loadStylesForSelectedRange = async (rangeOptionId) => {
    try {
      const styles = await getStylesForRange(rangeOptionId);
      if (styles.length > 0) {
        setLocalData(prev => ({
          ...prev,
          rangeStyles: { ...prev?.rangeStyles, [rangeOptionId]: styles },
        }));
      }
    } catch (err) {
      console.error('[DoorDesigner] Failed to load styles for range:', err);
    }
  };

  const filterValidSidelights = (opts) => {
    if (!opts) return [];
    return opts.filter(o => {
      // Validate bounds inside SVG wrapper
      if (!o.SVG) return true;
      let width = null, height = null;
      const viewBoxMatch = o.SVG.match(/viewBox="[\d\.\-]+\s+[\d\.\-]+\s+([\d\.]+)\s+([\d\.]+)"/);
      if (viewBoxMatch) {
        width = parseFloat(viewBoxMatch[1]);
        height = parseFloat(viewBoxMatch[2]);
      } else {
        const wMatch = o.SVG.match(/width="([\d\.]+)"/);
        const hMatch = o.SVG.match(/height="([\d\.]+)"/);
        if (wMatch && hMatch) {
          width = parseFloat(wMatch[1]);
          height = parseFloat(hMatch[1]);
        }
      }
      if (width && height && height > 0) {
        return (width / height) < 0.38;
      }
      return true;
    });
  };

  const isStepVisible = (stepDef, jobData) => {
    if (!stepDef) return false;
    const catId = stepDef.category;

    if (catId === 11 && localData) {
      if (localSelections[66] && localData?.rangeStyles?.[localSelections[66]]?.length > 0) return true;
      if (localData?.options?.[11]?.length > 0) return true;
      return false;
    }

    if (catId !== 11 && jobData) {
      const heading = findHeading(jobData, catId);
      if (heading && heading.Visible !== false && heading.Options) {
        let validOpts = heading.Options.filter(o => !o.ValidButHidden);
        
        // Ensure steps with massive Side Panel slabs are dynamically skipped if only slabs returned
        if (catId === OptionCategories.SidelightStyle) {
          validOpts = filterValidSidelights(validOpts);
        }

        if (validOpts.length > 0) return true;
      }
      return false;
    }
    
    // Fallback check if job hasn't loaded
    return true;
  };

  // Determine next step, skipping invisible/empty categories
  const getNextStep = (current, jobData) => {
    const maxStep = LOCAL_WIZARD_STEPS.length;
    let next = current + 1;
    while (next <= maxStep) {
      const stepDef = LOCAL_WIZARD_STEPS[next - 1];
      if (isStepVisible(stepDef, jobData)) {
        return next;
      }
      next++;
    }
    return Math.min(next, FINISH_STEP); // go to finish panel
  };

  const getVisibleSteps = () => {
    return LOCAL_WIZARD_STEPS.filter(step => isStepVisible(step, job));
  };

  const scrollToStep = (step) => {
    setTimeout(() => {
      const visibleSteps = getVisibleSteps();
      const index = visibleSteps.findIndex(s => s.id === step);
      const scrollIndex = index !== -1 ? index : step - 1;
      
      const PILL_ESTIMATED_WIDTH = 115; // Average width including gaps
      const centerPosition = (scrollIndex * PILL_ESTIMATED_WIDTH) + (PILL_ESTIMATED_WIDTH / 2) - (SCREEN_WIDTH / 2);
      
      stepsScrollRef.current?.scrollTo({ 
        x: Math.max(0, centerPosition), 
        animated: true 
      });
    }, 100);
  };

  // Navigate to a previous step
  const goToStep = (step) => {
    if (step <= currentStep) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCurrentStep(step);
      setHardwareSection(null);
      scrollToStep(step);
    }
  };

  const handleToggleView = () => {
    setSelecting(true);
    const js = generateToggleViewJS();
    apiWebViewRef.current?.injectJavaScript(js);
  };

  // Submit enquiry via WebView bridge
  const handleSubmitEnquiry = () => {
    if (!enquiryForm.name.trim() || !enquiryForm.email.trim()) {
      Alert.alert('Required', 'Please enter your name and email.');
      return;
    }
    setEnquirySubmitting(true);
    const js = generateSubmitEnquiryJS(enquiryForm);
    apiWebViewRef.current?.injectJavaScript(js);
  };

  // Reset everything
  const handleNewDoor = () => {
    setJob(null);
    setCurrentStep(1);
    setHardwareSection(null);
    setViewedFromInside(false);
    setEnquiryForm({ name: '', email: '', postcode: '', phone: '', feedback: '' });
    setEnquirySuccess(false);
    setLoading(true);
    setSessionReady(false);
    // Force reload the hidden WebView by remounting
    apiWebViewRef.current?.reload();
  };

  // Get options for current step
  const getCurrentOptions = () => {
    // Finish step: hardware sub-menus or empty (finish panel renders separately)
    if (currentStep === FINISH_STEP) {
      if (hardwareSection && job) {
        const heading = findHeading(job, hardwareSection);
        return heading?.Options?.filter(o => !o.ValidButHidden) || [];
      }
      return [];
    }

    const stepDef = LOCAL_WIZARD_STEPS[currentStep - 1];
    if (!stepDef) return [];
    const categoryId = stepDef.category;

    // For door styles (cat 11), filter by selected range using Supabase data
    if (categoryId === 11 && localData) {
      const selectedRange = localSelections[66];
      if (selectedRange && localData.rangeStyles?.[selectedRange]) {
        return localData.rangeStyles[selectedRange].filter(o => !o.valid_but_hidden);
      }
      const allStyles = localData.options?.[11] || [];
      if (selectedRange) {
        const filtered = allStyles.filter(o => o.parent_option_id === selectedRange && !o.valid_but_hidden);
        if (filtered.length > 0) return filtered;
      }
      return allStyles.filter(o => !o.parent_option_id && !o.valid_but_hidden);
    }

    // For all other categories, ALWAYS use the LIVE API data.
    if (job) {
      const heading = findHeading(job, categoryId);
      let validOpts = heading?.Options?.filter(o => !o.ValidButHidden) || [];
      
      // Filter Sidelight Styles to ONLY show narrow panels, excluding full door slabs
      if (categoryId === OptionCategories.SidelightStyle && validOpts.length > 0) {
        validOpts = filterValidSidelights(validOpts);
      }

      return validOpts;
    }
    return [];
  };

  // Deduplicate options by original_id (scraper saves same option across range walks)
  const deduplicateOptions = (options) => {
    const seen = new Set();
    return options.filter(o => {
      const key = o.original_id || o.ID;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const getCurrentCategoryId = () => {
    if (currentStep === FINISH_STEP && hardwareSection) return hardwareSection;
    const stepDef = LOCAL_WIZARD_STEPS[currentStep - 1];
    return stepDef?.category || null;
  };

  const getCurrentHeading = () => {
    const catId = getCurrentCategoryId();
    if (!catId) return null;
    return findHeading(job, catId);
  };

  // Check if an option is selected (local selections take priority)
  const isOptionSelected = (option, categoryId) => {
    // Check local selections first
    const localSel = localSelections[categoryId];
    const optId = option.original_id || option.ID;
    if (localSel) return localSel === optId;
    // Fall back to API selection
    const heading = job ? findHeading(job, categoryId) : null;
    return heading?.OptionSelectedID === optId;
  };

  // Get option image URL (Supabase URL or fallback to API)
  const getOptionImageUrl = (option) => {
    // Supabase option has image_url
    if (option.image_url) return option.image_url;
    // API option has StoredImageID
    if (option.StoredImageID && option.StoredImageID !== EMPTY_GUID_VALUE) {
      return getStoredImageUrl(option.StoredImageID, job?.ImageLibraryVersion);
    }
    return null;
  };

  // -- RENDER FUNCTIONS --

  const renderStepIndicator = () => (
    <View style={styles.stepsContainer}>
      <ScrollView
        ref={stepsScrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.stepsContent}
      >
        {getVisibleSteps().map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isLocked = step.id > currentStep;

          return (
            <TouchableOpacity
              key={step.id}
              onPress={() => goToStep(step.id)}
              activeOpacity={isLocked ? 1 : 0.7}
              style={[
                styles.stepPill,
                isActive && styles.stepPillActive,
                isCompleted && styles.stepPillCompleted,
                isLocked && styles.stepPillLocked,
              ]}
            >
              {isCompleted && (
                <Feather name="check" size={12} color="#fff" style={{ marginRight: 4 }} />
              )}
              <Text style={[
                styles.stepPillText,
                isActive && styles.stepPillTextActive,
                isCompleted && styles.stepPillTextCompleted,
                isLocked && styles.stepPillTextLocked,
              ]}>
                {step.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderDoorPreview = () => {
    if (!job?.SVG) {
      return (
        <View style={styles.previewPlaceholder}>
          <Feather name="home" size={48} color="#D1D5DB" />
          <Text style={styles.previewPlaceholderText}>
            Your door preview will{'\n'}appear here
          </Text>
        </View>
      );
    }

    const svgHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { width: 100%; height: 100%; overflow: hidden; background: #fff; }
          body { display: flex; justify-content: center; align-items: flex-start; height: 100%; }
          #container { width: 100%; height: 100%; display: flex; justify-content: center; align-items: flex-start; }
          svg { display: block; max-width: 100%; max-height: 100%; }
        </style>
      </head>
      <body>
        <div id="container">${job.SVG}</div>
      </body>
      <script>
        (function() {
          var svg = document.querySelector('svg');
          if (!svg) return;

          var isInside = ${viewedFromInside};
          if (isInside) {
            function hideKnockers() {
              // Method 1: Hide any SVG group/element explicitly named knocker
              var namedKnockers = document.querySelectorAll('[id*="knocker" i], [id*="Knocker" i], [id*="KNOCKER" i]');
              namedKnockers.forEach(function(node) {
                node.style.display = 'none';
              });

              // Method 2: Match knocker by its actual stored image URL from the API data
              var knockerImageId = '${(() => {
                if (!job?.Headings) return '';
                const knockerHeading = job.Headings.find(h => h.HeadingTypeID === 19); // OptionCategories.HardwareKnocker
                if (!knockerHeading || !knockerHeading.OptionSelectedID || knockerHeading.OptionSelectedID === EMPTY_GUID_VALUE) return '';
                const selectedOpt = knockerHeading.Options?.find(o => o.ID === knockerHeading.OptionSelectedID);
                if (!selectedOpt?.StoredImageID || selectedOpt.StoredImageID === EMPTY_GUID_VALUE) return '';
                return selectedOpt.StoredImageID;
              })()}';
              
              if (knockerImageId) {
                var images = document.querySelectorAll('image');
                images.forEach(function(img) {
                  var href = img.getAttribute('href') || img.getAttribute('xlink:href') || '';
                  if (href.indexOf(knockerImageId) !== -1) {
                    img.style.display = 'none';
                  }
                });
              }

              // Method 3: Geometric fallback — hide small images positioned in the upper-center of the door
              var images = document.querySelectorAll('image');
              var svgEl = document.querySelector('svg');
              var vb = svgEl ? svgEl.getAttribute('viewBox') : null;
              var canvasW = 906, canvasH = 2000;
              if (vb) {
                var parts = vb.split(/\\s+/);
                if (parts.length === 4) { canvasW = parseFloat(parts[2]); canvasH = parseFloat(parts[3]); }
              }
              
              images.forEach(function(img) {
                try {
                  var w = parseFloat(img.getAttribute('width') || 0);
                  var h = parseFloat(img.getAttribute('height') || 0);
                  var x = parseFloat(img.getAttribute('x') || 0);
                  var y = parseFloat(img.getAttribute('y') || 0);
                  var cx = x + (w/2);
                  var cy = y + (h/2);
                  var area = w * h;
                  var doorArea = canvasW * canvasH;

                  // Knockers: small (<5% door area), horizontally centered (middle third), upper half
                  if (area < doorArea * 0.05 && cx > canvasW * 0.3 && cx < canvasW * 0.7 && cy < canvasH * 0.45) {
                    img.style.display = 'none';
                  }
                } catch(e) {}
              });
            }
            
            // Run immediately and after images have loaded
            hideKnockers();
            setTimeout(hideKnockers, 500);
            setTimeout(hideKnockers, 1200);
          }

          // Force preserveAspectRatio for proper scaling
          svg.setAttribute('preserveAspectRatio', 'xMidYMin meet');
          // Try to crop the viewBox to just the content
          function crop() {
            try {
              var bbox = svg.getBBox();
              if (bbox.width > 0 && bbox.height > 0) {
                var pad = 2;
                svg.setAttribute('viewBox',
                  (bbox.x - pad) + ' ' + (bbox.y - pad) + ' ' +
                  (bbox.width + pad*2) + ' ' + (bbox.height + pad*2)
                );
                svg.style.width = '100%';
                svg.style.height = '100%';
              }
            } catch(e) {}
          }
          // Try immediately and after a delay for images
          crop();
          setTimeout(crop, 300);
          setTimeout(function() {
            crop();
            window.ReactNativeWebView.postMessage('PREVIEW_RENDERED');
          }, 1000);
        })();
      </script>
      </html>
    `;

    return (
      <View style={styles.previewContainer}>
        <WebView
          ref={svgWebViewRef}
          source={{ html: svgHtml, baseUrl: IMAGE_BASE_URL + '/' }}
          style={styles.previewWebView}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          javaScriptEnabled={true}
          originWhitelist={['*']}
          onMessage={(event) => {
            if (event.nativeEvent.data === 'PREVIEW_RENDERED') {
              setPreviewRendering(false);
            }
          }}
        />

        {/* View toggle badge */}
        {currentStep === FINISH_STEP && (
          <TouchableOpacity style={styles.viewToggleBadge} onPress={handleToggleView} disabled={selecting}>
            <Feather name="refresh-cw" size={14} color="#fff" />
            <Text style={styles.viewToggleText}>
              {viewedFromInside ? 'Inside View' : 'Outside View'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderOptionTile = (option, categoryId, index) => {
    const selected = isOptionSelected(option, categoryId);
    const imageUrl = getOptionImageUrl(option);
    const hasImage = !!imageUrl;
    const optionId = option.original_id || option.ID;
    const optionDesc = option.description || option.Description;
    const optionSubText = option.sub_text || option.SubText;
    const heading = getCurrentHeading();
    const dataLinkID = heading?.DataLinkID || option.data_link_id || EMPTY_GUID_VALUE;

    // Use 2 columns for visual categories, 3 for text-heavy ones
    const isLarge = LARGE_TILE_CATEGORIES.includes(categoryId);
    const tileW = isLarge ? (SCREEN_WIDTH - 40 - TILE_GAP) / 2 : TILE_WIDTH;
    const tileH = hasImage ? (isLarge ? tileW * 1.2 : tileW) : 60;

    // For image-less options, render as a compact list item
    if (!hasImage) {
      return (
        <TouchableOpacity
          key={option.id || `${optionId}-${index}`}
          style={[
            styles.optionListItem,
            { width: '100%' },
            selected && styles.optionListItemSelected,
          ]}
          onPress={() => handleSelectOption(categoryId, optionId, dataLinkID)}
          activeOpacity={0.7}
          disabled={selecting}
        >
          <View style={styles.optionListLeft}>
            <View style={[styles.optionRadio, selected && styles.optionRadioSelected]}>
              {selected && <View style={styles.optionRadioDot} />}
            </View>
            <View style={styles.optionListTextContainer}>
              <Text style={[styles.optionListTitle, selected && styles.optionListTitleSelected]} numberOfLines={2}>
                {optionDesc}
              </Text>
              {optionSubText ? (
                <Text style={styles.optionListSubText} numberOfLines={1}>{optionSubText}</Text>
              ) : null}
            </View>
          </View>
          {selected && (
            <Feather name="check" size={18} color="#e5040a" />
          )}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={option.id || `${optionId}-${index}`}
        style={[
          styles.optionTile,
          { width: tileW, height: tileH },
          selected && styles.optionTileSelected,
        ]}
        onPress={() => handleSelectOption(categoryId, optionId, dataLinkID)}
        activeOpacity={0.7}
        disabled={selecting}
      >
        <View style={[styles.optionImageContainer, { height: tileH - 40 }]}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.optionImage}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.optionTitle, selected && styles.optionTitleSelected]} numberOfLines={2}>
          {optionDesc}
        </Text>

        {selected && (
          <View style={styles.selectedBadge}>
            <Feather name="check" size={12} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderOptionsGrid = () => {
    const options = getCurrentOptions();
    const categoryId = getCurrentCategoryId();

    if (currentStep === FINISH_STEP && !hardwareSection) {
      return renderFinishPanel();
    }

    if (options.length === 0 && !loading) {
      return (
        <View style={styles.emptyOptions}>
          <Text style={styles.emptyOptionsText}>No options available for this step.</Text>
        </View>
      );
    }

    // Gate: show skeleton tiles until all images for this step are cached
    if (!stepReady && currentStep !== FINISH_STEP) {
      return (
        <View style={styles.optionsSection}>
          <View style={styles.optionsSectionHeader}>
            <Skeleton width={140} height={20} borderRadius={4} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stylesCarousel}>
            {[1, 2, 3, 4].map(i => (
              <View key={i} style={[styles.styleCard, { opacity: 1 }]}>  
                <View style={styles.styleCardImageWrap}>
                  <Skeleton width="100%" height="100%" borderRadius={12} />
                </View>
                <Skeleton width={80} height={14} borderRadius={4} style={{ marginTop: 8 }} />
              </View>
            ))}
          </ScrollView>
        </View>
      );
    }

    const heading = getCurrentHeading();
    const isCarouselStep = categoryId === 11 || 
                           categoryId === OptionCategories.DoorRange ||
                           categoryId === OptionCategories.DoorColourExternal || 
                           categoryId === OptionCategories.DoorColourInternal ||
                           categoryId === OptionCategories.DoorGlass ||
                           categoryId === OptionCategories.SidelightStyle ||
                           categoryId === OptionCategories.SidelightGlass;

    return (
      <View style={styles.optionsSection}>
        {/* Section title */}
        <View style={styles.optionsSectionHeader}>
          <Text style={styles.optionsSectionTitle}>
            {hardwareSection ? getHardwareSectionLabel(hardwareSection) : LOCAL_WIZARD_STEPS[currentStep - 1]?.label}
          </Text>
          {options.length > 0 && (
            <Text style={styles.optionsSectionCount}>
              {options.length} option{options.length !== 1 ? 's' : ''}
            </Text>
          )}
          {hardwareSection && (
            <TouchableOpacity onPress={() => setHardwareSection(null)} style={styles.backToFinish}>
              <Feather name="arrow-left" size={16} color="#e5040a" />
              <Text style={styles.backToFinishText}>Back</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Horizontal scrollable carousel for Styles and Colours */}
        {isCarouselStep ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stylesCarousel}
          >
            {options.map((option, idx) => {
              const selected = isOptionSelected(option, categoryId);
              const optionId = option.original_id || option.ID;
              const optionDesc = option.description || option.Description;
              const heading = getCurrentHeading();
              const apiOption = heading?.Options?.find(o => o.ID === optionId);
              const dataLinkID = heading?.DataLinkID || option.data_link_id || EMPTY_GUID_VALUE;

              const isSidelightStyle = categoryId === OptionCategories.SidelightStyle;
              const svgData = apiOption?.SVG || option.svg_data || option.SVG;
              const imageUrl = (apiOption && getOptionImageUrl(apiOption)) || option.image_url || getOptionImageUrl(option);
              const uniqueKey = option.id || `${optionId}-${idx}`;

              // Helper function to extract <image> tags from SVGs and stack them natively.
              // Includes physical envelope scaling to maintain exact aspect ratios!
              const renderNativeSvgImageStack = (svgString) => {
                let vbW = 900, vbH = 2000;
                const vbMatch = svgString.match(/viewBox="[\d\.\-]+\s+[\d\.\-]+\s+([\d\.]+)\s+([\d\.]+)"/);
                if (vbMatch) { vbW = parseFloat(vbMatch[1]); vbH = parseFloat(vbMatch[2]); }
                
                const imageMatches = [...svgString.matchAll(/<image[\s\S]*?x="([^"]+)"[\s\S]*?y="([^"]+)"[\s\S]*?width="([^"]+)"[\s\S]*?height="([^"]+)"[\s\S]*?(?:href|xlink:href)="([^"]+)"/g)];
                if (imageMatches.length === 0) return null;

                const scale = Math.min(120 / vbW, 180 / vbH);
                const finalW = vbW * scale;
                const finalH = vbH * scale;

                return (
                  <View style={{ width: finalW, height: finalH, alignSelf: 'center' }}>
                    {imageMatches.map((m, i) => (
                      <Image
                        key={i}
                        source={{ uri: m[5].replace(/&amp;/g, '&') }}
                        style={{
                          position: 'absolute',
                          left: `${(parseFloat(m[1]) / vbW) * 100}%`,
                          top: `${(parseFloat(m[2]) / vbH) * 100}%`,
                          width: `${(parseFloat(m[3]) / vbW) * 100}%`,
                          height: `${(parseFloat(m[4]) / vbH) * 100}%`,
                        }}
                        resizeMode="stretch"
                      />
                    ))}
                  </View>
                );
              };

              return (
                <TouchableOpacity
                  key={uniqueKey}
                  style={[styles.styleCard, selected && styles.styleCardSelected]}
                  onPress={() => handleSelectOption(categoryId, optionId, dataLinkID)}
                  activeOpacity={0.7}
                  disabled={selecting}
                >
                  <View style={styles.styleCardImageWrap}>
                    {svgData && categoryId === OptionCategories.SidelightStyle ? (
                      <View style={{ width: 120, height: 180, overflow: 'hidden' }} pointerEvents="none">
                        <WebView
                          source={{ html: `
                            <!DOCTYPE html>
                            <html>
                            <head>
                              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                              <style>
                                * { margin: 0; padding: 0; box-sizing: border-box; }
                                html, body { width: 100%; height: 100%; overflow: hidden; background: transparent; }
                                body { display: flex; justify-content: center; align-items: center; }
                                #container { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
                                svg { max-width: 100%; max-height: 100%; object-fit: contain; }
                              </style>
                            </head>
                            <body>
                              <div id="container">${svgData}</div>
                              <script>
                                (function() {
                                  var svg = document.querySelector('svg');
                                  if (!svg) return;
                                  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                                  function crop() {
                                    try {
                                      var bbox = svg.getBBox();
                                      if (bbox.width > 0 && bbox.height > 0) {
                                        var pad = 2;
                                        svg.setAttribute('viewBox', (bbox.x - pad) + ' ' + (bbox.y - pad) + ' ' + (bbox.width + pad*2) + ' ' + (bbox.height + pad*2));
                                        svg.style.width = '100%';
                                        svg.style.height = '100%';
                                      }
                                    } catch(e) {}
                                  }
                                  crop(); setTimeout(crop, 300);
                                })();
                              </script>
                            </body>
                            </html>
                          `, baseUrl: IMAGE_BASE_URL + '/' }}
                          style={{ width: 120, height: 180, backgroundColor: 'transparent' }}
                          scrollEnabled={false}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                          originWhitelist={['*']}
                        />
                      </View>
                    ) : svgData ? (
                      svgData.includes('<image') ? renderNativeSvgImageStack(svgData) || <SvgXml xml={svgData} width="100%" height="100%" /> : <SvgXml xml={svgData} width="100%" height="100%" />
                    ) : imageUrl ? (
                      <Image
                        source={{ uri: imageUrl }}
                        style={styles.styleCardImage}
                        resizeMode="contain"
                      />
                    ) : (
                      <Feather name="home" size={28} color={selected ? '#e5040a' : '#9CA3AF'} />
                    )}
                  </View>
                  <Text style={[styles.styleCardLabel, selected && styles.styleCardLabelSelected]} numberOfLines={2}>
                    {optionDesc}
                  </Text>
                  {selected && (
                    <View style={styles.styleCardBadge}>
                      <Feather name="check" size={10} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          /* Standard vertical grid for all other categories */
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.optionsGrid}
          >
            {options.map((option, idx) => renderOptionTile(option, categoryId, idx))}
          </ScrollView>
        )}
      </View>
    );
  };

  const getHardwareSectionLabel = (catId) => {
    switch (catId) {
      case OptionCategories.HardwareHandle: return 'Choose Handle';
      case OptionCategories.HardwareLetterplate: return 'Choose Letterplate';
      case OptionCategories.HardwareKnocker: return 'Choose Knocker';
      case OptionCategories.HardwareColour: return 'Hardware Colour';
      default: return 'Options';
    }
  };

  const renderFinishPanel = () => {
    if (!job) return null;

    const summaryItems = [
      { label: 'Door Style', value: getSelectedDescription(job, OptionCategories.DoorDesign) },
      { label: 'External Colour', value: getSelectedDescription(job, OptionCategories.DoorColourExternal) },
      { label: 'Internal Colour', value: getSelectedDescription(job, OptionCategories.DoorColourInternal) },
      { label: 'Frame Colour', value: getSelectedDescription(job, OptionCategories.FrameColour) },
      { label: 'Glass', value: getSelectedDescription(job, OptionCategories.DoorGlass) },
      { label: 'Handle', value: getSelectedDescription(job, OptionCategories.HardwareHandle) },
      { label: 'Letterplate', value: getSelectedDescription(job, OptionCategories.HardwareLetterplate) },
      { label: 'Knocker', value: getSelectedDescription(job, OptionCategories.HardwareKnocker) },
    ].filter(item => item.value);

    const hardwareOptions = [
      { label: 'Handle', icon: 'tool', category: OptionCategories.HardwareHandle },
      { label: 'Letterplate', icon: 'mail', category: OptionCategories.HardwareLetterplate },
      { label: 'Knocker', icon: 'disc', category: OptionCategories.HardwareKnocker },
    ].filter(item => findHeading(job, item.category));

    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.finishContainer}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Feather name="check-circle" size={20} color="#059669" />
            <Text style={styles.summaryTitle}>Your Door Specification</Text>
          </View>
          {summaryItems.map((item, idx) => (
            <View key={idx} style={[styles.summaryRow, idx === summaryItems.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.summaryLabel}>{item.label}</Text>
              <Text style={styles.summaryValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Hardware Customization */}
        {hardwareOptions.length > 0 && (
          <View style={styles.hardwareSection}>
            <Text style={styles.hardwareSectionTitle}>Customise Hardware</Text>
            <View style={styles.hardwareGrid}>
              {hardwareOptions.map((hw) => (
                <TouchableOpacity
                  key={hw.category}
                  style={styles.hardwareCard}
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setHardwareSection(hw.category);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.hardwareIconContainer}>
                    <Feather name={hw.icon} size={22} color="#e5040a" />
                  </View>
                  <Text style={styles.hardwareLabel}>{hw.label}</Text>
                  <Text style={styles.hardwareCurrent} numberOfLines={1}>
                    {getSelectedDescription(job, hw.category) || 'Choose'}
                  </Text>
                  <Feather name="chevron-right" size={16} color="#999" style={{ marginTop: 4 }} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* View Toggle */}
        <TouchableOpacity style={styles.viewToggleButton} onPress={handleToggleView} disabled={selecting}>
          <Feather name="refresh-cw" size={18} color="#4B5563" />
          <Text style={styles.viewToggleButtonText}>
            {viewedFromInside ? 'View from Outside' : 'View from Inside'}
          </Text>
        </TouchableOpacity>

        {/* Send Enquiry */}
        <TouchableOpacity
          style={styles.enquiryButton}
          onPress={() => { setEnquirySuccess(false); setShowEnquiry(true); }}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#e5040a', '#B80008']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.enquiryButtonGradient}
          >
            <Feather name="send" size={18} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.enquiryButtonText}>Send Enquiry</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.newDoorButton} onPress={handleNewDoor}>
          <Feather name="refresh-cw" size={16} color="#6B7280" style={{ marginRight: 8 }} />
          <Text style={styles.newDoorButtonText}>Start New Door</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderEnquiryModal = () => (
    <Modal visible={showEnquiry} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHandle} />

          {enquirySuccess ? (
            <View style={styles.enquirySuccessContainer}>
              <View style={styles.successIconContainer}>
                <Feather name="check-circle" size={48} color="#059669" />
              </View>
              <Text style={styles.successTitle}>Enquiry Sent!</Text>
              <Text style={styles.successMessage}>
                Thanks for your enquiry. We will get back to you as soon as we can.
              </Text>
              <TouchableOpacity
                style={styles.successCloseButton}
                onPress={() => setShowEnquiry(false)}
              >
                <Text style={styles.successCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.modalTitle}>Send Enquiry</Text>
              <Text style={styles.modalSubtitle}>
                Your details will be passed to your local Bradley Scott Windows partner.
              </Text>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Name *</Text>
                  <TextInput
                    style={styles.formInput}
                    value={enquiryForm.name}
                    onChangeText={(t) => setEnquiryForm(f => ({ ...f, name: t }))}
                    placeholder="Your full name"
                    placeholderTextColor="#A0AEC0"
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Email *</Text>
                  <TextInput
                    style={styles.formInput}
                    value={enquiryForm.email}
                    onChangeText={(t) => setEnquiryForm(f => ({ ...f, email: t }))}
                    placeholder="your@email.com"
                    placeholderTextColor="#A0AEC0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Postcode</Text>
                  <TextInput
                    style={styles.formInput}
                    value={enquiryForm.postcode}
                    onChangeText={(t) => setEnquiryForm(f => ({ ...f, postcode: t }))}
                    placeholder="e.g. BS1 1AA"
                    placeholderTextColor="#A0AEC0"
                    autoCapitalize="characters"
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Phone</Text>
                  <TextInput
                    style={styles.formInput}
                    value={enquiryForm.phone}
                    onChangeText={(t) => setEnquiryForm(f => ({ ...f, phone: t }))}
                    placeholder="Your phone number"
                    placeholderTextColor="#A0AEC0"
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Additional Notes</Text>
                  <TextInput
                    style={[styles.formInput, styles.formTextArea]}
                    value={enquiryForm.feedback}
                    onChangeText={(t) => setEnquiryForm(f => ({ ...f, feedback: t }))}
                    placeholder="Any additional details..."
                    placeholderTextColor="#A0AEC0"
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>
              </ScrollView>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowEnquiry(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmitEnquiry}
                  disabled={enquirySubmitting}
                >
                  <LinearGradient
                    colors={['#e5040a', '#B80008']}
                    style={styles.submitButtonGradient}
                  >
                    {enquirySubmitting ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      <>
                        <Feather name="send" size={16} color="#fff" style={{ marginRight: 8 }} />
                        <Text style={styles.submitButtonText}>Submit</Text>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );

  // -- LOADING / ERROR STATES --

  if (error) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        {/* Hidden API WebView still mounts for retry */}
        <WebView
          ref={apiWebViewRef}
          source={{ uri: SESSION_PAGE_URL }}
          style={{ width: 0, height: 0, position: 'absolute', opacity: 0 }}
          onLoadEnd={handleSessionPageLoaded}
          onMessage={handleApiMessage}
          javaScriptEnabled={true}
          thirdPartyCookiesEnabled={true}
          sharedCookiesEnabled={true}
        />
        <View style={styles.errorContent}>
          <Feather name="alert-circle" size={48} color="#e5040a" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => {
            setError(null);
            setLoading(true);
            apiWebViewRef.current?.reload();
          }}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // -- MAIN RENDER --

  if ((loading && !localDataReady) || (localDataReady && !job && !error)) {
    return (
      <View style={styles.container}>
        <View style={{ width: 0, height: 0, overflow: 'hidden', position: 'absolute' }}>
          <WebView
            ref={apiWebViewRef}
            source={{ uri: SESSION_PAGE_URL }}
            style={{ width: 0, height: 0, opacity: 0 }}
            onLoadEnd={handleSessionPageLoaded}
            onMessage={handleApiMessage}
            javaScriptEnabled={true}
            thirdPartyCookiesEnabled={true}
            sharedCookiesEnabled={true}
          />
        </View>
        <View style={styles.previewSection}>
          <View style={styles.previewContainer}>
            <Skeleton width="55%" height="90%" style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: 0 }} borderRadius={16} />
          </View>
        </View>
        <View style={[styles.stepsContainer, { paddingHorizontal: 20, paddingTop: 20 }]}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} width={i === 1 ? 100 : i === 2 ? 80 : 120} height={36} borderRadius={20} />
            ))}
          </View>
        </View>
        <View style={styles.optionsPanel}>
          <View style={[styles.optionsSectionHeader, { marginTop: 16 }]}>
            <Skeleton width={140} height={20} borderRadius={4} />
          </View>
          <View style={[styles.optionsGrid, { marginTop: 10 }]}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <View key={i} style={{ width: TILE_WIDTH, height: TILE_WIDTH }}>
                <Skeleton width="100%" height="100%" borderRadius={16} />
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Hidden WebView: loads the ASPX page to establish session, then handles all API calls */}
      <View style={{ width: 0, height: 0, overflow: 'hidden', position: 'absolute' }}>
        <WebView
          ref={apiWebViewRef}
          source={{ uri: SESSION_PAGE_URL }}
          style={{ width: 0, height: 0, opacity: 0 }}
          onLoadEnd={handleSessionPageLoaded}
          onMessage={handleApiMessage}
          javaScriptEnabled={true}
          thirdPartyCookiesEnabled={true}
          sharedCookiesEnabled={true}
        />
      </View>

      {/* Selecting indicator (subtle right badge) */}
      {selecting && (
        <View style={styles.selectingIndicatorBadge}>
          <ActivityIndicator size="small" color="#e5040a" />
        </View>
      )}

      {localDataReady && job && (
        <View style={{ flex: 1, width: '100%' }} pointerEvents={selecting ? 'none' : 'auto'}>
          {/* Door Preview - Top section */}
          <View style={styles.previewSection}>
            {renderDoorPreview()}
          </View>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Options - Bottom section */}
          <View style={styles.optionsPanel}>
            {renderOptionsGrid()}
          </View>
        </View>
      )}

      {/* Enquiry Modal */}
      {renderEnquiryModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  errorContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'RM',
    color: '#374151',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 22,
  },
  retryButton: {
    marginTop: 24,
    backgroundColor: '#e5040a',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    fontSize: 15,
    fontFamily: 'RB',
    color: '#fff',
  },

  // Preview Section
  previewSection: {
    height: '42%',
    backgroundColor: '#fff',
    overflow: 'hidden',
    paddingTop: 16,
    paddingBottom: 4,
  },
  previewContainer: {
    flex: 1,
    position: 'relative',
  },
  previewWebView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  previewPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  previewPlaceholderText: {
    fontSize: 15,
    fontFamily: 'RM',
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 21,
  },
  viewToggleBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewToggleText: {
    fontSize: 12,
    fontFamily: 'RM',
    color: '#fff',
    marginLeft: 6,
  },

  // Step Indicator
  stepsContainer: {
    paddingVertical: 12,
  },
  stepsContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  stepPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  stepPillActive: {
    backgroundColor: '#e5040a',
    borderColor: '#e5040a',
  },
  stepPillCompleted: {
    backgroundColor: '#111',
    borderColor: '#111',
  },
  stepPillLocked: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    opacity: 0.5,
  },
  stepPillText: {
    fontSize: 13,
    fontFamily: 'RB',
    color: '#4B5563',
  },
  stepPillTextActive: {
    color: '#fff',
  },
  stepPillTextCompleted: {
    color: '#fff',
  },
  stepPillTextLocked: {
    color: '#9CA3AF',
  },

  // Options Panel
  optionsPanel: {
    flex: 1,
    overflow: 'hidden',
  },
  optionsSection: {
    flex: 1,
  },
  optionsSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 10,
  },
  optionsSectionTitle: {
    fontSize: 18,
    fontFamily: 'RB',
    color: '#111',
    flex: 1,
  },
  optionsSectionCount: {
    fontSize: 13,
    fontFamily: 'RM',
    color: '#9CA3AF',
  },
  backToFinish: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  backToFinishText: {
    fontSize: 14,
    fontFamily: 'RB',
    color: '#e5040a',
    marginLeft: 4,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: TILE_GAP,
    paddingBottom: 20,
  },
  stylesCarousel: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 10,
  },
  styleCard: {
    width: 140,
    alignItems: 'center',
  },
  styleCardSelected: {},
  styleCardImageWrap: {
    width: 120,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  styleCardImage: {
    width: '100%',
    height: '100%',
  },
  colourSwatchImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  styleCardLabel: {
    fontSize: 11,
    fontFamily: 'RM',
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 14,
  },
  styleCardLabelSelected: {
    color: '#e5040a',
    fontFamily: 'RB',
  },
  styleCardBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#e5040a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyOptions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyOptionsText: {
    fontSize: 15,
    fontFamily: 'RM',
    color: '#9CA3AF',
    textAlign: 'center',
  },

  // Option Tiles
  optionTile: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  optionTileSelected: {
    borderColor: '#e5040a',
    shadowColor: '#e5040a',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  optionImageContainer: {
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  optionImage: {
    width: '85%',
    height: '85%',
  },
  optionTitle: {
    fontSize: 11,
    fontFamily: 'RB',
    color: '#374151',
    textAlign: 'center',
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  optionTitleSelected: {
    color: '#e5040a',
  },

  // List-style option items (for text-only / no-image options)
  optionListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  optionListItemSelected: {
    borderColor: '#e5040a',
    backgroundColor: '#FEF2F2',
  },
  optionListLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionRadioSelected: {
    borderColor: '#e5040a',
  },
  optionRadioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e5040a',
  },
  optionListTextContainer: {
    flex: 1,
  },
  optionListTitle: {
    fontSize: 14,
    fontFamily: 'RM',
    color: '#374151',
  },
  optionListTitleSelected: {
    fontFamily: 'RB',
    color: '#e5040a',
  },
  optionListSubText: {
    fontSize: 12,
    fontFamily: 'RM',
    color: '#9CA3AF',
    marginTop: 2,
  },
  selectedBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#e5040a',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#e5040a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  // Finish Panel
  finishContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  summaryTitle: {
    fontSize: 17,
    fontFamily: 'RB',
    color: '#111',
    marginLeft: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'RM',
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'RB',
    color: '#111',
    maxWidth: '60%',
    textAlign: 'right',
  },

  // Hardware Section
  hardwareSection: {
    marginBottom: 20,
  },
  hardwareSectionTitle: {
    fontSize: 16,
    fontFamily: 'RB',
    color: '#111',
    marginBottom: 12,
  },
  hardwareGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  hardwareCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  hardwareIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  hardwareLabel: {
    fontSize: 13,
    fontFamily: 'RB',
    color: '#111',
    marginBottom: 2,
  },
  hardwareCurrent: {
    fontSize: 11,
    fontFamily: 'RM',
    color: '#6B7280',
    textAlign: 'center',
  },

  // View Toggle Button
  viewToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  viewToggleButtonText: {
    fontSize: 15,
    fontFamily: 'RB',
    color: '#4B5563',
    marginLeft: 10,
  },

  // Enquiry Button
  enquiryButton: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#e5040a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  enquiryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  enquiryButtonText: {
    fontSize: 17,
    fontFamily: 'RB',
    color: '#fff',
  },

  // New Door Button
  newDoorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  newDoorButtonText: {
    fontSize: 15,
    fontFamily: 'RM',
    color: '#6B7280',
  },

  // Overlays & Badges
  selectingIndicatorBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 100,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '85%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'RB',
    color: '#111',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: 'RM',
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 20,
  },

  // Form Fields
  formField: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontFamily: 'RB',
    color: '#374151',
    marginBottom: 6,
  },
  formInput: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: 'RM',
    color: '#111',
    backgroundColor: '#fff',
  },
  formTextArea: {
    height: 80,
    paddingTop: 12,
  },

  // Modal Buttons
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontFamily: 'RB',
    color: '#4B5563',
  },
  submitButton: {
    flex: 2,
    borderRadius: 14,
    overflow: 'hidden',
  },
  submitButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
  },
  submitButtonText: {
    fontSize: 15,
    fontFamily: 'RB',
    color: '#fff',
  },

  // Enquiry Success
  enquirySuccessContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontFamily: 'RB',
    color: '#111',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 15,
    fontFamily: 'RM',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  successCloseButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 14,
  },
  successCloseText: {
    fontSize: 15,
    fontFamily: 'RB',
    color: '#374151',
  },
});

export default Designer;

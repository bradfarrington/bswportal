import React, { useState, useRef, useEffect } from "react";
import { 
  View,
  DeviceEventEmitter, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Alert, 
  Dimensions, 
  PanResponder, 
  ActivityIndicator,
  Animated,
  useWindowDimensions,
  ScrollView,
  Platform,
  Modal,
  TextInput
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { WebView } from "react-native-webview";

import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';
import { Feather } from '@expo/vector-icons';
import { decode } from "base64-arraybuffer";
import { supabase } from '../config/supabaseClient';
import { createPerspectiveMatrix } from '../utils/PerspectiveMath';


const DraggableDoor = ({ doorSvgHtml, onRemove, isActive, onActivate }) => {
  const W = 120;
  const H = 240;

  const [cornersState, setCornersState] = useState({
    tl: { x: 50, y: 50 },
    tr: { x: 50 + W, y: 50 },
    bl: { x: 50, y: 50 + H },
    br: { x: 50 + W, y: 50 + H },
  });
  const cornersRef = useRef(cornersState);
  const initialCorners = useRef(null);

  const updateCorners = (newCorners) => {
    cornersRef.current = newCorners;
    setCornersState(newCorners);
  };

  const initPan = () => {
    onActivate();
    initialCorners.current = {
      tl: { ...cornersRef.current.tl },
      tr: { ...cornersRef.current.tr },
      bl: { ...cornersRef.current.bl },
      br: { ...cornersRef.current.br },
    };
  };

  const panResponderMove = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: initPan,
      onPanResponderMove: (e, gestureState) => {
        const dx = gestureState.dx;
        const dy = gestureState.dy;
        updateCorners({
          tl: { x: initialCorners.current.tl.x + dx, y: initialCorners.current.tl.y + dy },
          tr: { x: initialCorners.current.tr.x + dx, y: initialCorners.current.tr.y + dy },
          bl: { x: initialCorners.current.bl.x + dx, y: initialCorners.current.bl.y + dy },
          br: { x: initialCorners.current.br.x + dx, y: initialCorners.current.br.y + dy },
        });
      },
    })
  ).current;

  const createCornerPan = (cornerKey) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: initPan,
      onPanResponderMove: (e, gestureState) => {
        const next = {
          tl: { ...initialCorners.current.tl },
          tr: { ...initialCorners.current.tr },
          bl: { ...initialCorners.current.bl },
          br: { ...initialCorners.current.br },
        };
        next[cornerKey].x += gestureState.dx;
        next[cornerKey].y += gestureState.dy;
        updateCorners(next);
      },
    });
  };

  const panTL = useRef(createCornerPan('tl')).current;
  const panTR = useRef(createCornerPan('tr')).current;
  const panBL = useRef(createCornerPan('bl')).current;
  const panBR = useRef(createCornerPan('br')).current;

  const matrix = createPerspectiveMatrix(W, H, cornersState.tl, cornersState.tr, cornersState.bl, cornersState.br);

  return (
    <View style={[StyleSheet.absoluteFillObject]} pointerEvents="box-none">
      <View
        {...panResponderMove.panHandlers}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: W,
          height: H,
          transform: [{ matrix }],
          borderColor: isActive ? '#E5040A' : 'transparent',
          borderWidth: isActive ? 2 : 0,
        }}
      >
        <View pointerEvents="none" style={styles.windowImageStretched}>
          <WebView 
            source={{ html: doorSvgHtml, baseUrl: 'https://designer.bswwindows.co.uk/' }}
            style={{ flex: 1, backgroundColor: 'transparent' }}
            opaque={false}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      {isActive && (
        <TouchableOpacity 
          style={[styles.deleteBtn, { left: cornersState.tr.x + 10, top: cornersState.tr.y - 30 }]} 
          onPress={onRemove}
        >
          <Ionicons name="close" size={16} color="#fff" />
        </TouchableOpacity>
      )}

      {isActive && (
        <>
          <View style={[styles.cornerHandle, { left: cornersState.tl.x - 10, top: cornersState.tl.y - 10 }]} {...panTL.panHandlers} />
          <View style={[styles.cornerHandle, { left: cornersState.tr.x - 10, top: cornersState.tr.y - 10 }]} {...panTR.panHandlers} />
          <View style={[styles.cornerHandle, { left: cornersState.bl.x - 10, top: cornersState.bl.y - 10 }]} {...panBL.panHandlers} />
          <View style={[styles.cornerHandle, { left: cornersState.br.x - 10, top: cornersState.br.y - 10 }]} {...panBR.panHandlers} />
        </>
      )}
    </View>
  );
};

const DraggableWindow = ({ windowKey, selectedColor, onRemove, isActive, onActivate, windowAssets }) => {
  const W = 150;
  const H = 200;

  const [cornersState, setCornersState] = useState({
    tl: { x: 50, y: 50 },
    tr: { x: 50 + W, y: 50 },
    bl: { x: 50, y: 50 + H },
    br: { x: 50 + W, y: 50 + H },
  });
  const cornersRef = useRef(cornersState);
  const initialCorners = useRef(null);

  const updateCorners = (newCorners) => {
    cornersRef.current = newCorners;
    setCornersState(newCorners);
  };

  const initPan = () => {
    onActivate();
    initialCorners.current = {
      tl: { ...cornersRef.current.tl },
      tr: { ...cornersRef.current.tr },
      bl: { ...cornersRef.current.bl },
      br: { ...cornersRef.current.br },
    };
  };

  // Get the most appropriate image asset
  const colorAssets = windowAssets[windowKey];
  const exactAsset = colorAssets ? colorAssets[selectedColor?.id] : null;
  const fallbackAsset = colorAssets ? colorAssets["White"] : null;
  const imageUrl = exactAsset || fallbackAsset;
  const imageSource = imageUrl ? { uri: imageUrl } : null;
  const tintColor = !exactAsset && selectedColor ? selectedColor.hex : undefined;

  // Move entire object
  const panResponderMove = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: initPan,
      onPanResponderMove: (e, gestureState) => {
        const dx = gestureState.dx;
        const dy = gestureState.dy;
        updateCorners({
          tl: { x: initialCorners.current.tl.x + dx, y: initialCorners.current.tl.y + dy },
          tr: { x: initialCorners.current.tr.x + dx, y: initialCorners.current.tr.y + dy },
          bl: { x: initialCorners.current.bl.x + dx, y: initialCorners.current.bl.y + dy },
          br: { x: initialCorners.current.br.x + dx, y: initialCorners.current.br.y + dy },
        });
      },
    })
  ).current;

  // Generic generator for corner adjustment PanResponders
  const createCornerPan = (cornerKey) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: initPan,
      onPanResponderMove: (e, gestureState) => {
        const next = {
          tl: { ...initialCorners.current.tl },
          tr: { ...initialCorners.current.tr },
          bl: { ...initialCorners.current.bl },
          br: { ...initialCorners.current.br },
        };
        next[cornerKey].x += gestureState.dx;
        next[cornerKey].y += gestureState.dy;
        updateCorners(next);
      },
    });
  };

  const panTL = useRef(createCornerPan('tl')).current;
  const panTR = useRef(createCornerPan('tr')).current;
  const panBL = useRef(createCornerPan('bl')).current;
  const panBR = useRef(createCornerPan('br')).current;

  const matrix = createPerspectiveMatrix(W, H, cornersState.tl, cornersState.tr, cornersState.bl, cornersState.br);

  return (
    <View style={[StyleSheet.absoluteFillObject]} pointerEvents="box-none">
      <View
        {...panResponderMove.panHandlers}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: W,
          height: H,
          transform: [{ matrix }],
          borderColor: isActive ? '#E5040A' : 'transparent',
          borderWidth: isActive ? 2 : 0,
        }}
      >
        {imageSource && (
          <Image 
            source={imageSource} 
            style={[styles.windowImageStretched, tintColor && { tintColor }]} 
            resizeMode="stretch" 
          />
        )}
      </View>

      {isActive && (
        <TouchableOpacity 
          style={[styles.deleteBtn, { left: cornersState.tr.x + 10, top: cornersState.tr.y - 30 }]} 
          onPress={onRemove}
        >
          <Ionicons name="close" size={16} color="#fff" />
        </TouchableOpacity>
      )}

      {isActive && (
        <>
          <View style={[styles.cornerHandle, { left: cornersState.tl.x - 10, top: cornersState.tl.y - 10 }]} {...panTL.panHandlers} />
          <View style={[styles.cornerHandle, { left: cornersState.tr.x - 10, top: cornersState.tr.y - 10 }]} {...panTR.panHandlers} />
          <View style={[styles.cornerHandle, { left: cornersState.bl.x - 10, top: cornersState.bl.y - 10 }]} {...panBL.panHandlers} />
          <View style={[styles.cornerHandle, { left: cornersState.br.x - 10, top: cornersState.br.y - 10 }]} {...panBR.panHandlers} />
        </>
      )}
    </View>
  );
};

export default function WindowDesignScreen({ navigation, route }) {
  const [imageUri, setImageUri] = useState(null);
  
  // Data fetched from Supabase
  const [allColors, setAllColors] = useState([]);
  const [windowKeys, setWindowKeys] = useState([]);
  const [windowAssets, setWindowAssets] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState(null); 
  const [addedItems, setAddedItems] = useState([]);
  
  // Enquiry State
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [submittingEnquiry, setSubmittingEnquiry] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '', email: '', phone: '', postcode: '', feedback: ''
  });
  
  // Listen for new custom doors passed in from Designer
  useEffect(() => {
    if (route.params?.newDoorSvgHtml) {
      const id = Date.now().toString();
      setAddedItems(prev => [...prev, { id, type: 'door', doorSvgHtml: route.params.newDoorSvgHtml }]);
      setActiveWindowId(id);
      navigation.setParams({ newDoorSvgHtml: undefined });
    }

    const subscription = DeviceEventEmitter.addListener('onReturnDoor', (data) => {
      const doorSvgHtml = typeof data === 'object' ? data.baseSvgHtml : data;
      const doorSpec = typeof data === 'object' ? data.doorSpec : null;
      const id = Date.now().toString();
      setAddedItems(prev => [...prev, { id, type: 'door', doorSvgHtml, doorSpec }]);
      setActiveWindowId(id);
    });

    return () => {
      subscription.remove();
    };
  }, [route.params?.newDoorSvgHtml]);
 
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const containerRef = useRef(null);

  React.useEffect(() => {
    async function loadData() {
      try {
        const [colorsRes, stylesRes, assetsRes] = await Promise.all([
          supabase.from('visualiser_colors').select('*').order('sort_order', { ascending: true }),
          supabase.from('visualiser_window_styles').select('*').order('sort_order', { ascending: true }),
          supabase.from('visualiser_assets').select('*')
        ]);

        if (colorsRes.data) {
          setAllColors(colorsRes.data);
          if (colorsRes.data.length > 0) {
            setSelectedColor(colorsRes.data[0]);
          }
        }
        
        if (stylesRes.data) {
          setWindowKeys(stylesRes.data.filter(s => s.id !== 'window1').map(s => s.id));
        }

        if (assetsRes.data) {
           const assetsMap = {};
           assetsRes.data.forEach(asset => {
             if (!assetsMap[asset.window_style_id]) {
               assetsMap[asset.window_style_id] = {};
             }
             assetsMap[asset.window_style_id][asset.color_id] = asset.image_url;
           });
           setWindowAssets(assetsMap);
        }
      } catch (err) {
        console.warn('Failed to load visualiser data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async (base64Uri, pathPrefix) => {
    if (!base64Uri) return null;
    try {
      const base64Data = base64Uri.split(",")[1] || base64Uri;
      if (!base64Data) return null;
      
      let filePath = base64Uri;
      if (base64Uri.startsWith('data:')) {
         filePath = FileSystem.cacheDirectory + `temp_${Date.now()}.jpg`;
         await FileSystem.writeAsStringAsync(filePath, base64Data, { encoding: FileSystem.EncodingType.Base64 });
      } else if (!base64Uri.startsWith('file://')) {
         filePath = FileSystem.cacheDirectory + `temp_${Date.now()}.jpg`;
         await FileSystem.writeAsStringAsync(filePath, base64Data, { encoding: FileSystem.EncodingType.Base64 });
      }

      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) return null;

      const fileString = await FileSystem.readAsStringAsync(filePath, { encoding: FileSystem.EncodingType.Base64 });
      const arrayBuffer = decode(fileString);

      const fileName = `${pathPrefix}-${Date.now()}.jpg`;
      const { data, error } = await supabase.storage.from('door-enquiries').upload(fileName, arrayBuffer, {
        contentType: 'image/jpeg'
      });

      if (error) {
        console.error(`[Upload] error for ${pathPrefix}:`, error);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage.from('door-enquiries').getPublicUrl(fileName);
      return publicUrl;
    } catch (err) {
      console.error(`[Upload] Exception for ${pathPrefix}:`, err);
      return null;
    }
  };

  const handleSubmitEnquiry = async () => {
    if (!enquiryForm.name.trim() || !enquiryForm.email.trim()) {
      Alert.alert('Required', 'Please enter your name and email.');
      return;
    }
    setSubmittingEnquiry(true);
    try {
      setIsSaving(true);
      await new Promise(r => setTimeout(r, 100)); // allow render flush
      const localUri = await captureRef(containerRef, {
        format: "png",
        quality: 1,
        result: "base64"
      });
      setIsSaving(false);

      const originalImageUrl = await uploadImage(imageUri, 'original-photo');
      const viewOnHomeImageUrl = await uploadImage(localUri, 'view-on-home');

      const doorItem = addedItems.find(item => item.type === 'door' && item.doorSpec);
      let doorSpec = doorItem ? doorItem.doorSpec : null;

      const windowItems = addedItems.filter(item => item.type === 'window');
      let windowsText = '';
      if (windowItems.length > 0 && selectedColor) {
         windowsText = `Additional Window Spec:\nSelected Window Frame Colour: ${selectedColor.name}`;
      }

      const finalFeedback = [enquiryForm.feedback, windowsText].filter(Boolean).join('\n\n');

      const SUPABASE_URL = 'https://kmrfnaurkbmkkoumfnxp.supabase.co';
      const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcmZuYXVya2Jta2tvdW1mbnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjY4NTAsImV4cCI6MjA5MTg0Mjg1MH0.V64OETndBlnMMn7ymtv2M3e5GmX3ROk1FwbIaC1_N1k';

      const response = await fetch(`${SUPABASE_URL}/functions/v1/send-door-enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name: enquiryForm.name,
          email: enquiryForm.email,
          phone: enquiryForm.phone,
          postcode: enquiryForm.postcode,
          feedback: finalFeedback,
          outsideImageUrl: null,
          insideImageUrl: null,
          viewOnHomeImageUrl: viewOnHomeImageUrl,
          originalImageUrl: originalImageUrl,
          doorSpec: doorSpec || {}
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setEnquirySuccess(true);
      } else {
        Alert.alert('Error', result.error || 'Failed to send enquiry. Please try again.');
      }
    } catch (err) {
      console.error('[VisualiserEnquiry] error:', err);
      Alert.alert('Error', 'An unexpected error occurred. Please check your connection.');
    } finally {
      setIsSaving(false);
      setSubmittingEnquiry(false);
    }
  };

  const renderEnquiryModal = () => (
    <Modal visible={showEnquiry} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {enquirySuccess ? (
            <View style={styles.successContainer}>
              <View style={styles.successIconWrapper}>
                <Feather name="check-circle" size={50} color="#10B981" />
              </View>
              <Text style={styles.successTitle}>Enquiry Sent!</Text>
              <Text style={styles.successText}>Thank you for your enquiry. Our team will review your custom view on home and get back to you shortly.</Text>
              <TouchableOpacity 
                style={styles.successButton}
                onPress={() => { setShowEnquiry(false); setEnquirySuccess(false); setSubmittingEnquiry(false); }}
              >
                <Text style={styles.successButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Send Enquiry</Text>
                <TouchableOpacity onPress={() => setShowEnquiry(false)} style={styles.modalCloseBtn}>
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <ScrollView 
                style={styles.modalScroll} 
                contentContainerStyle={styles.modalScrollContent}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.modalInstructions}>
                  Fill out your details below and we'll send it directly to our team alongside your Visualiser composition.
                </Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Name *</Text>
                  <TextInput
                    style={styles.textInput}
                    value={enquiryForm.name}
                    onChangeText={(t) => setEnquiryForm(f => ({ ...f, name: t }))}
                    placeholder="Your full name"
                    placeholderTextColor="#A0AEC0"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email *</Text>
                  <TextInput
                    style={styles.textInput}
                    value={enquiryForm.email}
                    onChangeText={(t) => setEnquiryForm(f => ({ ...f, email: t }))}
                    placeholder="hello@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#A0AEC0"
                  />
                </View>

                <View style={[styles.inputGroup, styles.rowGroup]}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.inputLabel}>Phone (Optional)</Text>
                    <TextInput
                      style={styles.textInput}
                      value={enquiryForm.phone}
                      onChangeText={(t) => setEnquiryForm(f => ({ ...f, phone: t }))}
                      placeholder="07..."
                      keyboardType="phone-pad"
                      placeholderTextColor="#A0AEC0"
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.inputLabel}>Postcode (Optional)</Text>
                    <TextInput
                      style={styles.textInput}
                      value={enquiryForm.postcode}
                      onChangeText={(t) => setEnquiryForm(f => ({ ...f, postcode: t }))}
                      placeholder="Postcode"
                      autoCapitalize="characters"
                      placeholderTextColor="#A0AEC0"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Additional Notes</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
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
                <TouchableOpacity style={styles.cancelButton} onPress={() => setShowEnquiry(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitEnquiry} disabled={submittingEnquiry}>
                  <LinearGradient colors={['#e5040a', '#B80008']} style={styles.submitButtonGradient}>
                    {submittingEnquiry ? (
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
      </View>
    </Modal>
  );

  const handleDownload = async () => {
    try {
      if (!imageUri || addedItems.length === 0) {
        Alert.alert("Missing Items", "Please upload a photo and add at least one item.");
        return;
      }

      setIsSaving(true);
      await new Promise(r => setTimeout(r, 100));

      console.log("[Design] Capturing design...");
      const localUri = await captureRef(containerRef, {
        format: "png",
        quality: 1,
        result: route.params?.returnToDesigner ? "base64" : "tmpfile"
      });

      if (route.params?.returnToDesigner) {
        // We are returning to the designer enquiry flow
        navigation.navigate('Designer', { capturedVisualiserImage: localUri });
        setIsSaving(false);
        return;
      }


      try {
        await MediaLibrary.saveToLibraryAsync(localUri);
        Alert.alert("Saved!", "Your design has been saved to your camera roll.");
        return;
      } catch (mlError) {
        console.warn("[Save] MediaLibrary failed:", mlError);
      }

      await Sharing.shareAsync(localUri, { UTI: "public.image", mimeType: "image/png" });
    } catch (error) {
      console.error("[Save] Error:", error);
      Alert.alert("Error", "Failed to save the image.");
    } finally {
      setIsSaving(false);
    }
  };

  const addWindow = (windowKey) => {
    const id = Date.now().toString();
    setAddedItems([...addedItems, { id, type: 'window', windowKey }]);
    setActiveWindowId(id);
  };

  const removeItem = (id) => {
    setAddedItems(addedItems.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#E5040A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
              <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>{route.params?.returnToDesigner ? "View on Home" : "Design Your Own"}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity onPress={handleDownload} disabled={isSaving}>
              <Ionicons name="download-outline" size={24} color={isSaving ? "#666" : "#fff"} />
            </TouchableOpacity>
            {!route.params?.returnToDesigner && (
              <TouchableOpacity onPress={() => setShowEnquiry(true)} style={{ backgroundColor: '#E5040A', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 16 }}>
                <Text style={{ color: '#fff', fontFamily: 'InterBold', fontSize: 13 }}>Send Enquiry</Text>
              </TouchableOpacity>
            )}
            {route.params?.returnToDesigner && (
              <TouchableOpacity onPress={handleDownload} disabled={isSaving} style={{ backgroundColor: '#E5040A', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 16 }}>
                <Text style={{ color: '#fff', fontFamily: 'InterBold', fontSize: 13 }}>Done</Text>
              </TouchableOpacity>
            )}
          </View>
      </View>

      <View style={styles.editorContainer} ref={containerRef} collapsable={false}>
        {imageUri ? (
          <>
            <TouchableOpacity activeOpacity={1} onPress={() => setActiveWindowId(null)} style={StyleSheet.absoluteFillObject}>
              <Image source={{ uri: imageUri }} style={StyleSheet.absoluteFillObject} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.repickBtn} onPress={pickImage}>
              <Ionicons name="crop" size={20} color="#fff" />
              <Text style={styles.repickBtnText}>Re-upload / Crop</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.placeholderContainer} onPress={pickImage}>
            <Ionicons name="image-outline" size={64} color="#9CA3AF" />
            <Text style={styles.placeholderText}>Tap to upload your home</Text>
          </TouchableOpacity>
        )}

        {/* Render all added items on top of the image */}
        {imageUri && addedItems.map((item) => {
          if (item.type === 'window') {
            return (
              <DraggableWindow 
                key={item.id} 
                windowKey={item.windowKey} 
                selectedColor={selectedColor} 
                isActive={item.id === activeWindowId}
                onActivate={() => setActiveWindowId(item.id)}
                onRemove={() => removeItem(item.id)}
                windowAssets={windowAssets}
              />
            );
          } else if (item.type === 'door') {
            return (
              <DraggableDoor
                key={item.id}
                doorSvgHtml={item.doorSvgHtml}
                isActive={item.id === activeWindowId}
                onActivate={() => setActiveWindowId(item.id)}
                onRemove={() => removeItem(item.id)}
              />
            );
          }
          return null;
        })}

        {imageUri && (
          <View style={styles.watermarkOverlay} pointerEvents="none">
            <Image 
              source={require('../assets/doors/composite-doors/background-1-no-bg.png')} 
              style={styles.watermarkImageFull} 
              resizeMode="cover" 
            />
          </View>
        )}
      </View>

      {imageUri && (
        <View style={styles.controlPanel}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={[styles.label, { marginBottom: 0 }]}>1. Add to your home</Text>
            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#E5040A', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }}
              onPress={() => navigation.navigate('Designer', { fromVisualiser: true })}
            >
              <Ionicons name="color-wand-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
              <Text style={{ color: '#fff', fontFamily: 'InterSemiBold', fontSize: 13 }}>Design Custom Door</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 16, paddingRight: 16 }} style={styles.windowList}>
            {windowKeys.map((key) => (
              <TouchableOpacity 
                key={key} 
                style={styles.windowThumbnailBtn} 
                onPress={() => addWindow(key)}
                activeOpacity={0.7}
              >
                <View style={styles.windowThumbnailWrapper}>
                  {windowAssets[key]?.["White"] && (
                    <Image 
                      source={{ uri: windowAssets[key]["White"] }} 
                      style={styles.windowThumbnailImg} 
                      resizeMode="contain" 
                    />
                  )}
                  <View style={styles.addOverlay}><Ionicons name="add-circle" size={24} color="#E5040A" /></View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={[styles.label, { marginTop: 16 }]}>2. Frame Colour {selectedColor?.name ? `(${selectedColor.name})` : ''}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorList}>
            {allColors.map(c => (
              <TouchableOpacity 
                key={c.id} 
                style={[
                  styles.colorCircle, 
                  { backgroundColor: c.hex },
                  selectedColor?.id === c.id && styles.colorCircleActive
                ]}
                onPress={() => setSelectedColor(c)}
              />
            ))}
          </ScrollView>
        </View>
      )}
      {renderEnquiryModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  modalTitle: { fontSize: 18, fontFamily: 'InterBold', color: '#111' },
  modalCloseBtn: { padding: 4 },
  modalScroll: { paddingHorizontal: 24, marginVertical: 16 },
  modalScrollContent: { paddingBottom: 10 },
  modalInstructions: { fontSize: 14, fontFamily: 'InterMedium', color: '#666', lineHeight: 20, marginBottom: 20 },
  inputGroup: { marginBottom: 16 },
  rowGroup: { flexDirection: 'row' },
  inputLabel: { fontSize: 13, fontFamily: 'InterSemiBold', color: '#374151', marginBottom: 6 },
  textInput: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, fontFamily: 'InterMedium', color: '#111', backgroundColor: '#fafafa' },
  textArea: { minHeight: 80, paddingTop: 12 },
  modalButtons: { flexDirection: 'row', paddingHorizontal: 24, paddingTop: 12, paddingBottom: 30, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  cancelButton: { flex: 1, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: '#f3f4f6', marginRight: 8 },
  cancelButtonText: { color: '#4B5563', fontSize: 15, fontFamily: 'InterSemiBold' },
  submitButton: { flex: 1, marginLeft: 8 },
  submitButtonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 12 },
  submitButtonText: { color: '#fff', fontSize: 15, fontFamily: 'InterSemiBold' },
  successContainer: { alignItems: 'center', justifyContent: 'center', padding: 40 },
  successIconWrapper: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  successTitle: { fontSize: 24, fontFamily: 'InterBold', color: '#111', marginBottom: 12 },
  successText: { fontSize: 15, fontFamily: 'InterMedium', color: '#6B7280', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  successButton: { backgroundColor: '#111', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12, width: '100%', alignItems: 'center' },
  successButtonText: { color: '#fff', fontSize: 16, fontFamily: 'InterSemiBold' },

  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topBar: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20, 
    paddingHorizontal: 16, 
    paddingBottom: 10, 
    backgroundColor: '#000', 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  topBarTitle: {
    color: '#fff', 
    fontSize: 18, 
    fontFamily: 'InterBold',
  },
  editorContainer: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  repickBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 20,
  },
  repickBtnText: {
    color: '#fff',
    fontFamily: 'InterMedium',
    fontSize: 13,
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  placeholderText: {
    marginTop: 12,
    color: '#9CA3AF',
    fontFamily: 'InterMedium',
  },
  watermarkOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.08,
    zIndex: 5,
  },
  watermarkImageFull: {
    width: '100%',
    height: '100%',
  },
  draggableBox: {
    position: 'absolute',
  },
  cornerHandle: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderColor: '#E5040A',
    borderWidth: 2,
    borderRadius: 10,
    zIndex: 10,
  },
  tl: { top: -10, left: -10 },
  tr: { top: -10, right: -10 },
  bl: { bottom: -10, left: -10 },
  br: { bottom: -10, right: -10 },
  deleteBtn: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  windowImageStretched: {
    width: '100%',
    height: '100%',
  },
  controlPanel: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 50 : 30,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  label: {
    fontFamily: 'InterSemiBold',
    fontSize: 15,
    color: '#111',
    marginBottom: 6,
    marginTop: 0,
  },
  windowList: {
    flexDirection: 'row',
  },
  windowThumbnailBtn: {
    marginRight: 16,
  },
  windowThumbnailWrapper: {
    width: 80,
    height: 100,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  windowThumbnailImg: {
    width: '100%',
    height: '100%',
  },
  addOverlay: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  colorList: {
    flexDirection: 'row',
  },
  colorCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginRight: 12,
  },
  colorCircleActive: {
    borderWidth: 3,
    borderColor: '#E5040A',
  },
});

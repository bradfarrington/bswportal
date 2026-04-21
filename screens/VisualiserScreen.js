import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator, Modal, Animated, useWindowDimensions, TextInput, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { hasReachedGenerationLimit, incrementGenerationCount } from "../utils/VisualiserStorage";
import { generateVisualiserImage } from "../utils/VisualiserApi";
import { Ionicons, Feather } from "@expo/vector-icons";
import PrimaryButton from "../components/PrimaryButton";
import { BlurView } from "expo-blur";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { supabase } from '../config/supabaseClient';

const ALL_COLORS = [
  "White", "White Grain", "Ice Cream", "Ice Cream Grained", "Ice Cream on White", "Cherrywood", "Cherrywood on White",
  "Rosewood", "Rosewood on White", "Irish Oak", "Anthracite Grey", "Smooth Anthracite Grey", "Anthracite Grey on White",
  "Smooth Anthracite Grey on White", "Anthracite Grey on White Grained", "Agate Grey", "Agate Grey on White",
  "Agate Grey on White Grained", "French Grey on White", "French Grey on White Grained", "Light Grey on White",
  "Silver Grey on White", "Chartwell Green", "Chartwell Green on White", "Black", "Black Grained on White",
  "Black on White Grained", "Balmoral Grey on White Grained", "Ivory on White Grained", "Rosewood on White Grained"
];
const WINDOW_COLORS = ALL_COLORS;
const DOOR_COLORS = ["None", ...ALL_COLORS];
const STYLES = ["Keep Existing", "Modern", "Traditional"];

const MAINTENANCE_TIPS = [
  "Did you know? Lubricating window and door hinges with light machine oil every 3 months ensures optimal performance.",
  "Avoid abrasive cleaners or scouring pads on your PVC-U frames to keep them looking fresh.",
  "To prevent condensation, leave a 150mm gap between curtains and windows for better air circulation.",
  "Lift your door handle fully every time you shut it to engage all locking points and prevent thermal distortion.",
  "Remove hand jewellery prior to cleaning double-glazed units to avoid accidental scratches.",
  "Periodically check and clear the drain slots in your window frames to ensure efficient water drainage.",
  "A simple monthly wash with warm soapy water keeps your composite door in top condition.",
  "Never use jet washes or high-pressure cleaners on your windows and doors; a soft cloth is all you need."
];

export default function VisualiserScreen({ navigation }) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isTablet = windowWidth >= 768;
  const isLandscape = windowWidth > windowHeight;

  const [imageUri, setImageUri] = useState(null);
  const [windowColor, setWindowColor] = useState("White");
  const [doorColor, setDoorColor] = useState("None");
  const [style, setStyle] = useState("Keep Existing");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownSelected, setDropdownSelected] = useState("");
  const [dropdownOnSelect, setDropdownOnSelect] = useState(() => () => {});
  const [dropdownTitle, setDropdownTitle] = useState("");

  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [submittingEnquiry, setSubmittingEnquiry] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '', email: '', phone: '', postcode: '', feedback: ''
  });

  const openDropdown = (title, options, selected, onSelect) => {
    setDropdownTitle(title);
    setDropdownOptions(options);
    setDropdownSelected(selected);
    setDropdownOnSelect(() => onSelect);
    setDropdownVisible(true);
  };

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    checkLimits();
  }, []);

  // Cycle tips while generating
  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(() => {
        // Fade out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          // Switch tip
          setCurrentTipIndex((prev) => (prev + 1) % MAINTENANCE_TIPS.length);
          // Fade in
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        });
      }, 5000); // 5 seconds per tip
    } else {
      setCurrentTipIndex(0);
      fadeAnim.setValue(1);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const checkLimits = async () => {
    const reached = await hasReachedGenerationLimit();
    setLimitReached(reached);
  };

  const pickImage = async (useCamera = false) => {
    if (limitReached) {
      Alert.alert("Limit Reached", "You have reached your daily visualization limit (5 generations) for this device.");
      return;
    }

    let result;
    if (useCamera) {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "Camera access is needed to take a photo.");
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });
    }

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleGenerate = async () => {
    if (!imageUri) {
      Alert.alert("Missing Image", "Please upload a photo of your house first.");
      return;
    }

    if (limitReached) {
      Alert.alert("Limit Reached", "You have reached your daily visualization limit (5 generations) for this device.");
      return;
    }

    setIsGenerating(true);
    try {
      // Setup options
      const options = {
        windowColor,
        doorColor: doorColor !== "None" ? doorColor : null,
        style: style !== "Keep Existing" ? style : null,
        customPrompt: customPrompt.trim() !== "" ? customPrompt.trim() : null,
      };

      const finalImageUrl = await generateVisualiserImage(imageUri, options);
      
      // Increment limit counter
      await incrementGenerationCount();

      // If result is a base64 data URI, write it to a local file first.
      // Passing multi-MB base64 strings through React Navigation params causes OOM crashes.
      let safeImageUri = finalImageUrl;
      if (finalImageUrl && finalImageUrl.startsWith("data:image")) {
        console.log("[Visualiser] Converting base64 result to file...");
        const base64Data = finalImageUrl.split(",")[1];
        const filePath = FileSystem.cacheDirectory + `visualiser_${Date.now()}.png`;
        await FileSystem.writeAsStringAsync(filePath, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });
        safeImageUri = filePath;
        console.log("[Visualiser] Saved to:", filePath);
      }

      // Navigate to results screen with lightweight file URI
      navigation.navigate("VisualiserResult", { 
        originalImage: imageUri,
        generatedImage: safeImageUri,
        options 
      });
    } catch (error) {
      const msg = error.message || "An unexpected error occurred.";
      if (msg.includes("Network request failed")) {
        Alert.alert(
          "Connection Lost",
          "The request was interrupted. Please stay in the app while your image is being generated and try again."
        );
      } else {
        Alert.alert("Generation Failed", msg);
      }
    } finally {
      setIsGenerating(false);
      checkLimits();
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
      const { data, error } = await supabase.storage.from('door-enquiries').upload(fileName, arrayBuffer, { contentType: 'image/jpeg' });
      if (error) { console.error(`[Upload] error for ${pathPrefix}:`, error); return null; }
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
      let originalImageUrl = null;
      if (imageUri) {
         originalImageUrl = await uploadImage(imageUri, 'visualiser-request-photo');
      }
      let configText = `Visualiser Configuration:\n- Window Colour: ${windowColor}`;
      if (doorColor && doorColor !== "None") configText += `\n- Door Colour: ${doorColor}`;
      if (style && style !== "Keep Existing") configText += `\n- Style: ${style}`;
      if (customPrompt) configText += `\n- Custom Instructions: ${customPrompt}`;
      const finalFeedback = [enquiryForm.feedback, configText, "THIS IS A DAILY LIMIT UNLOCK REQUEST"].filter(Boolean).join('\n\n');
      const SUPABASE_URL = 'https://kmrfnaurkbmkkoumfnxp.supabase.co';
      const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcmZuYXVya2Jta2tvdW1mbnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjY4NTAsImV4cCI6MjA5MTg0Mjg1MH0.V64OETndBlnMMn7ymtv2M3e5GmX3ROk1FwbIaC1_N1k';
      const response = await fetch(`${SUPABASE_URL}/functions/v1/send-door-enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({
          name: enquiryForm.name, email: enquiryForm.email, phone: enquiryForm.phone, postcode: enquiryForm.postcode,
          feedback: finalFeedback, outsideImageUrl: null, insideImageUrl: null, viewOnHomeImageUrl: null,
          originalImageUrl: originalImageUrl, doorSpec: {}
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
      setSubmittingEnquiry(false);
    }
  };

  const renderEnquiryModal = () => (
    <Modal visible={showEnquiry} animationType="slide" transparent={true}>
      <View style={styles.modalOverlayEnquiry}>
        <View style={styles.modalContentEnquiry}>
          {enquirySuccess ? (
            <View style={styles.successContainerEnquiry}>
              <View style={styles.successIconWrapperEnquiry}>
                <Feather name="check-circle" size={50} color="#10B981" />
              </View>
              <Text style={styles.successTitleEnquiry}>Enquiry Sent!</Text>
              <Text style={styles.successTextEnquiry}>Thank you for your request. Our team will review your details and get back to you shortly.</Text>
              <TouchableOpacity 
                style={styles.successButtonEnquiry}
                onPress={() => { setShowEnquiry(false); setEnquirySuccess(false); setSubmittingEnquiry(false); }}
              >
                <Text style={styles.successButtonTextEnquiry}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.modalHeaderEnquiry}>
                <Text style={styles.modalTitleEnquiry}>Send Enquiry</Text>
                <TouchableOpacity onPress={() => setShowEnquiry(false)} style={styles.modalCloseBtnEnquiry}>
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <ScrollView 
                style={styles.modalScrollEnquiry} 
                contentContainerStyle={styles.modalScrollContentEnquiry}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.modalInstructionsEnquiry}>
                  Fill out your details below and we'll send it directly to our team to request your unlock limit.
                </Text>
                <View style={styles.inputGroupEnquiry}>
                  <Text style={styles.inputLabelEnquiry}>Name *</Text>
                  <TextInput
                    style={styles.textInputEnquiry}
                    value={enquiryForm.name}
                    onChangeText={(t) => setEnquiryForm(f => ({ ...f, name: t }))}
                    placeholder="Your full name"
                    placeholderTextColor="#A0AEC0"
                  />
                </View>
                <View style={styles.inputGroupEnquiry}>
                  <Text style={styles.inputLabelEnquiry}>Email *</Text>
                  <TextInput
                    style={styles.textInputEnquiry}
                    value={enquiryForm.email}
                    onChangeText={(t) => setEnquiryForm(f => ({ ...f, email: t }))}
                    placeholder="hello@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#A0AEC0"
                  />
                </View>
                <View style={[styles.inputGroupEnquiry, styles.rowGroupEnquiry]}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.inputLabelEnquiry}>Phone (Optional)</Text>
                    <TextInput
                      style={styles.textInputEnquiry}
                      value={enquiryForm.phone}
                      onChangeText={(t) => setEnquiryForm(f => ({ ...f, phone: t }))}
                      placeholder="07..."
                      keyboardType="phone-pad"
                      placeholderTextColor="#A0AEC0"
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.inputLabelEnquiry}>Postcode (Optional)</Text>
                    <TextInput
                      style={styles.textInputEnquiry}
                      value={enquiryForm.postcode}
                      onChangeText={(t) => setEnquiryForm(f => ({ ...f, postcode: t }))}
                      placeholder="Postcode"
                      autoCapitalize="characters"
                      placeholderTextColor="#A0AEC0"
                    />
                  </View>
                </View>
                <View style={styles.inputGroupEnquiry}>
                  <Text style={styles.inputLabelEnquiry}>Additional Notes</Text>
                  <TextInput
                    style={[styles.textInputEnquiry, styles.textAreaEnquiry]}
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
              <View style={styles.modalButtonsEnquiry}>
                <TouchableOpacity style={styles.cancelButtonEnquiry} onPress={() => setShowEnquiry(false)}>
                  <Text style={styles.cancelButtonTextEnquiry}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButtonEnquiry} onPress={handleSubmitEnquiry} disabled={submittingEnquiry}>
                  <LinearGradient colors={['#e5040a', '#B80008']} style={styles.submitButtonGradientEnquiry}>
                    {submittingEnquiry ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      <>
                        <Feather name="send" size={16} color="#fff" style={{ marginRight: 8 }} />
                        <Text style={styles.submitButtonTextEnquiry}>Submit</Text>
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

  const DropdownInput = ({ label, value, options, onSelect }) => (
    <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>{label}</Text>
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => openDropdown(label, options, value, onSelect)}
          activeOpacity={0.7}
        >
          <Text style={styles.dropdownButtonText}>{value}</Text>
          <Feather name="chevron-down" size={16} color="#6B7280" />
        </TouchableOpacity>
    </View>
  );

  const renderImageUploader = () => (
    <View style={[styles.uploadSection, isTablet && isLandscape && { marginBottom: 0, flex: 1 }]}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={[styles.previewImage, isTablet && { height: 300 }]} />
      ) : (
        <View style={[styles.placeholderContainer, isTablet && { height: 260 }]}>
          <Ionicons name="home-outline" size={isTablet ? 56 : 48} color="#9CA3AF" />
          <Text style={styles.placeholderText}>Upload front or rear of house</Text>
        </View>
      )}
      
      <View style={styles.uploadButtonsRow}>
        <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(true)}>
          <Ionicons name="camera" size={20} color="#fff" />
          <Text style={styles.uploadButtonText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadButtonAlt} onPress={() => pickImage(false)}>
          <Ionicons name="images" size={20} color="#111827" />
          <Text style={styles.uploadButtonAltText}>Gallery</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.clearButton} onPress={() => setImageUri(null)}>
          <Text style={styles.clearButtonText}>Clear Image</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>AI Visualiser</Text>
        <Text style={styles.subtitle}>See what new windows and doors will look like on your house.</Text>

        {!(isTablet && isLandscape) && renderImageUploader()}

        {isTablet && isLandscape ? (
          <View style={{ flexDirection: 'row', gap: 24, marginBottom: 32 }}>
            <View style={{ flex: 1 }}>
              {renderImageUploader()}
            </View>
            <View style={{ flex: 1.2, flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', gap: 16 }}>
                <View style={{ flex: 1 }}>
                  <DropdownInput label="Window Colour" value={windowColor} options={WINDOW_COLORS} onSelect={setWindowColor} />
                </View>
                <View style={{ flex: 1 }}>
                  <DropdownInput label="Door Colour (Optional)" value={doorColor} options={DOOR_COLORS} onSelect={setDoorColor} />
                </View>
                <View style={{ flex: 1 }}>
                  <DropdownInput label="Style (Optional)" value={style} options={STYLES} onSelect={setStyle} />
                </View>
              </View>
              <View style={[styles.customPromptContainer, { flex: 1, marginBottom: 0 }]}>
                <Text style={styles.dropdownLabel}>Custom Instructions (Optional)</Text>
                <TextInput 
                  style={[styles.customPromptInput, { flex: 1 }]}
                  placeholder="e.g. Change the guttering colour to black..."
                  placeholderTextColor="#9CA3AF"
                  value={customPrompt}
                  onChangeText={setCustomPrompt}
                  multiline
                />
              </View>
            </View>
          </View>
        ) : isTablet ? (
          <View style={{ flexDirection: 'row', gap: 24, marginBottom: 8 }}>
            <View style={{ flex: 1 }}>
              <DropdownInput label="Window Colour" value={windowColor} options={WINDOW_COLORS} onSelect={setWindowColor} />
              <DropdownInput label="Door Colour (Optional)" value={doorColor} options={DOOR_COLORS} onSelect={setDoorColor} />
              <DropdownInput label="Style (Optional)" value={style} options={STYLES} onSelect={setStyle} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={[styles.customPromptContainer, { flex: 1 }]}>
                <Text style={styles.dropdownLabel}>Custom Instructions (Optional)</Text>
                <TextInput 
                  style={[styles.customPromptInput, { flex: 1 }]}
                  placeholder="e.g. Change the guttering colour to black..."
                  placeholderTextColor="#9CA3AF"
                  value={customPrompt}
                  onChangeText={setCustomPrompt}
                  multiline
                />
              </View>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.configSection}>
              <DropdownInput label="Window Colour" value={windowColor} options={WINDOW_COLORS} onSelect={setWindowColor} />
              <DropdownInput label="Door Colour (Optional)" value={doorColor} options={DOOR_COLORS} onSelect={setDoorColor} />
              <DropdownInput label="Style (Optional)" value={style} options={STYLES} onSelect={setStyle} />
            </View>

            <View style={styles.customPromptContainer}>
              <Text style={styles.dropdownLabel}>Custom Instructions (Optional)</Text>
              <TextInput 
                style={styles.customPromptInput}
                placeholder="e.g. Change the guttering colour to black..."
                placeholderTextColor="#9CA3AF"
                value={customPrompt}
                onChangeText={setCustomPrompt}
                multiline
              />
            </View>
          </>
        )}

        {limitReached ? (
          <View style={styles.limitReachedCard}>
            <View style={styles.limitHeader}>
              <Ionicons name="sparkles" size={24} color="#F59E0B" />
              <Text style={styles.limitCardTitle}>Daily Limit Reached</Text>
            </View>
            <Text style={styles.limitCardDesc}>
              You've reached your 5 daily AI generations! It looks like you're exploring some great options.
            </Text>
            <Text style={styles.limitCardDesc}>
              To unlock unlimited generation, simply submit an enquiry with your favorite design so far, and one of our experts will assist you. Alternatively, take full control with our interactive designer.
            </Text>
            <View style={styles.limitButtonsRow}>
              <TouchableOpacity 
                style={styles.limitPrimaryButton}
                onPress={() => navigation.navigate("WindowDesignScreen")}
              >
                <Ionicons name="color-palette-outline" size={18} color="#fff" />
                <Text style={styles.limitPrimaryButtonText}>Interactive Designer</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.limitSecondaryButton}
                onPress={() => setShowEnquiry(true)}
              >
                <Ionicons name="mail-outline" size={18} color="#1E3A8A" />
                <Text style={styles.limitSecondaryButtonText}>Submit Enquiry</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ marginTop: 16 }}>
            <PrimaryButton 
              title={isGenerating ? "Generating..." : "Generate Preview"}
              icon={!isGenerating ? <Ionicons name="color-wand-outline" size={20} color="#fff" /> : null}
              rightIcon={!isGenerating ? <Feather name="arrow-right" size={18} color="#fff" /> : null}
              onPress={handleGenerate}
              isLoading={isGenerating}
              disabled={!imageUri}
            />
          </View>
        )}

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Design Your Own Option */}
        <TouchableOpacity 
          style={styles.designOwnCard}
          onPress={() => navigation.navigate("WindowDesignScreen")}
          activeOpacity={0.9}
        >
          <View style={styles.designOwnInner}>
              <Image
                source={require('../assets/visualiser-card-bg.jpg')}
                style={styles.designOwnBackground}
                resizeMode="cover"
              />
              
              <View style={styles.designOwnContent}>
                <Text style={styles.designOwnTitle}>Prefer more control?</Text>
                <Text style={styles.designOwnDesc}>Manually drag, scale, and customise window designs right over your photo.</Text>
                
                <View style={styles.designOwnButtonWrapper}>
                  <View style={styles.designOwnButtonGlow} />
                  <LinearGradient
                    colors={['#1E3A8A', '#172554']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.designOwnButton}
                  >
                    <Ionicons name="color-palette" size={16} color="#fff" />
                    <Text style={styles.designOwnBtnText}>Design Your Own</Text>
                  </LinearGradient>
                </View>
              </View>
          </View>
        </TouchableOpacity>

      {/* Loading Overlay Modal */}
      <Modal visible={isGenerating} transparent animationType="fade">
        <BlurView intensity={90} tint="dark" style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#E5040A" style={styles.loadingSpinner} />
          <Text style={styles.loadingTitle}>Visualising Your Home</Text>
          <Text style={styles.loadingSubtitle}>
            Our AI is generating your design. This usually takes between 15-30 seconds.
          </Text>
          
          <View style={styles.stayInAppBanner}>
            <Ionicons name="phone-portrait-outline" size={16} color="#FCD34D" />
            <Text style={styles.stayInAppText}>Please stay in the app while generating</Text>
          </View>
          
          <Animated.View style={[styles.tipContainer, { opacity: fadeAnim }]}>
            <View style={styles.tipHeader}>
              <Ionicons name="bulb" size={24} color="#FBBF24" />
              <Text style={styles.tipHeaderText}>Maintenance Tip</Text>
            </View>
            <Text style={styles.tipText}>{MAINTENANCE_TIPS[currentTipIndex]}</Text>
          </Animated.View>
        </BlurView>
      </Modal>

      {/* Dropdown Modal */}
      <Modal visible={dropdownVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setDropdownVisible(false)} />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{dropdownTitle}</Text>
              <TouchableOpacity onPress={() => setDropdownVisible(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScroll}>
              {dropdownOptions.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.modalOption, dropdownSelected === opt && styles.modalOptionSelected]}
                  onPress={() => {
                    dropdownOnSelect(opt);
                    setDropdownVisible(false);
                  }}
                >
                  <Text style={[styles.modalOptionText, dropdownSelected === opt && styles.modalOptionTextSelected]}>
                    {opt}
                  </Text>
                  {dropdownSelected === opt && <Ionicons name="checkmark" size={20} color="#1E3A8A" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      {renderEnquiryModal()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    fontFamily: "InterBold",
    fontSize: 28,
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "InterMedium",
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 24,
    lineHeight: 22,
  },
  uploadSection: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  previewImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  placeholderContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    marginBottom: 16,
  },
  placeholderText: {
    fontFamily: "InterMedium",
    color: "#9CA3AF",
    marginTop: 12,
  },
  uploadButtonsRow: {
    flexDirection: "row",
    gap: 12,
  },
  uploadButton: {
    flex: 1,
    backgroundColor: "#111827",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },
  uploadButtonAlt: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },
  uploadButtonText: {
    color: "#FFF",
    fontFamily: "InterSemiBold",
    marginLeft: 8,
    fontSize: 15,
  },
  uploadButtonAltText: {
    color: "#111827",
    fontFamily: "InterSemiBold",
    marginLeft: 8,
    fontSize: 15,
  },
  clearButton: {
    marginTop: 12,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#EF4444",
    fontFamily: "InterMedium",
  },
  configSection: {
    marginBottom: 32,
  },
  configSectionTablet: {
    flexDirection: 'row',
    gap: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontFamily: 'InterMedium',
    fontSize: 14,
    color: '#9CA3AF',
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
    color: "#374151",
    marginBottom: 12,
    marginTop: 16,
  },
  designOwnCard: {
    marginBottom: 24,
    position: 'relative',
    height: 190,
    zIndex: 10,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  designOwnInner: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  designOwnBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  designOwnContent: {
    padding: 24,
    zIndex: 2,
    flex: 1,
    justifyContent: 'center',
  },
  designOwnTitle: {
    fontFamily: 'InterBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  designOwnDesc: {
    fontFamily: 'InterMedium',
    fontSize: 14,
    color: '#D4D4D8',
    marginBottom: 18,
    lineHeight: 20,
  },
  designOwnButtonWrapper: {
    alignSelf: 'flex-start',
    position: 'relative',
  },
  designOwnButtonGlow: {
    position: 'absolute',
    top: -2,
    bottom: -2,
    left: -2,
    right: -2,
    backgroundColor: 'rgba(30, 58, 138, 0.8)',
    borderRadius: 22,
    zIndex: 1,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  designOwnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  designOwnBtnText: {
    color: '#FFFFFF',
    fontFamily: 'InterSemiBold',
    marginLeft: 8,
    fontSize: 14,
  },
  pillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  pill: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  pillSelected: {
    backgroundColor: "#FEE2E2",
    borderColor: "#E5040A",
  },
  pillText: {
    fontFamily: "InterMedium",
    color: "#6B7280",
    fontSize: 14,
  },
  pillTextSelected: {
    color: "#E5040A",
    fontFamily: "InterSemiBold",
  },

  dropdownContainer: {
    marginBottom: 24,
  },
  dropdownLabel: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
    color: "#374151",
    marginBottom: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFF',
  },
  dropdownButtonText: {
    fontFamily: 'InterMedium',
    fontSize: 15,
    color: '#111827',
  },
  customPromptContainer: {
    marginBottom: 24,
  },
  customPromptInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: 'InterMedium',
    fontSize: 15,
    color: '#111827',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  limitContainer: {
    backgroundColor: "#FEE2E2",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  limitText: {
    color: "#B91C1C",
    fontFamily: "InterSemiBold",
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingSpinner: {
    transform: [{ scale: 1.5 }],
    marginBottom: 24,
  },
  loadingTitle: {
    fontFamily: "InterBold",
    fontSize: 24,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 8,
  },
  loadingSubtitle: {
    fontFamily: "InterMedium",
    fontSize: 15,
    color: "#D1D5DB",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  tipContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  tipHeaderText: {
    color: "#FBBF24",
    fontFamily: "InterBold",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  tipText: {
    fontFamily: "InterMedium",
    fontSize: 16,
    color: "#F9FAFB",
    lineHeight: 24,
  },
  stayInAppBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(252, 211, 77, 0.15)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 24,
  },
  stayInAppText: {
    fontFamily: "InterMedium",
    fontSize: 13,
    color: "#FCD34D",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    paddingBottom: 24,
  },
  limitReachedCard: {
    backgroundColor: '#FFF8F1',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#FDE68A',
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginTop: 16,
  },
  limitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  limitCardTitle: {
    fontFamily: 'InterBold',
    fontSize: 20,
    color: '#92400E',
  },
  limitCardDesc: {
    fontFamily: 'InterMedium',
    fontSize: 15,
    color: '#B45309',
    lineHeight: 22,
    marginBottom: 16,
  },
  limitButtonsRow: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 8,
  },
  limitPrimaryButton: {
    backgroundColor: '#1E3A8A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  limitPrimaryButtonText: {
    color: '#FFF',
    fontFamily: 'InterSemiBold',
    fontSize: 15,
  },
  limitSecondaryButton: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E3A8A',
    gap: 8,
  },
  limitSecondaryButtonText: {
    color: '#1E3A8A',
    fontFamily: 'InterSemiBold',
    fontSize: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontFamily: 'InterBold',
    fontSize: 18,
    color: '#111827',
  },
  modalScroll: {
    paddingHorizontal: 20,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalOptionSelected: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: -12,
    borderBottomWidth: 0,
  },
  modalOptionText: {
    fontFamily: 'InterMedium',
    fontSize: 16,
    color: '#4B5563',
  },
  modalOptionTextSelected: {
    color: '#1E3A8A',
    fontFamily: 'InterBold',
  },
  modalOverlayEnquiry: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContentEnquiry: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '90%' },
  modalHeaderEnquiry: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  modalTitleEnquiry: { fontSize: 18, fontFamily: 'InterBold', color: '#111' },
  modalCloseBtnEnquiry: { padding: 4 },
  modalScrollEnquiry: { paddingHorizontal: 24, marginVertical: 16 },
  modalScrollContentEnquiry: { paddingBottom: 10 },
  modalInstructionsEnquiry: { fontSize: 14, fontFamily: 'InterMedium', color: '#666', lineHeight: 20, marginBottom: 20 },
  inputGroupEnquiry: { marginBottom: 16 },
  rowGroupEnquiry: { flexDirection: 'row' },
  inputLabelEnquiry: { fontSize: 13, fontFamily: 'InterSemiBold', color: '#374151', marginBottom: 6 },
  textInputEnquiry: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, fontFamily: 'InterMedium', color: '#111', backgroundColor: '#fafafa' },
  textAreaEnquiry: { minHeight: 80, paddingTop: 12 },
  modalButtonsEnquiry: { flexDirection: 'row', paddingHorizontal: 24, paddingTop: 12, paddingBottom: 30, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  cancelButtonEnquiry: { flex: 1, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: '#f3f4f6', marginRight: 8 },
  cancelButtonTextEnquiry: { color: '#4B5563', fontSize: 15, fontFamily: 'InterSemiBold' },
  submitButtonEnquiry: { flex: 1, marginLeft: 8 },
  submitButtonGradientEnquiry: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 12 },
  submitButtonTextEnquiry: { color: '#fff', fontSize: 15, fontFamily: 'InterSemiBold' },
  successContainerEnquiry: { alignItems: 'center', justifyContent: 'center', padding: 40 },
  successIconWrapperEnquiry: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  successTitleEnquiry: { fontSize: 24, fontFamily: 'InterBold', color: '#111', marginBottom: 12 },
  successTextEnquiry: { fontSize: 15, fontFamily: 'InterMedium', color: '#6B7280', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  successButtonEnquiry: { backgroundColor: '#111', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12, width: '100%', alignItems: 'center' },
  successButtonTextEnquiry: { color: '#fff', fontSize: 16, fontFamily: 'InterSemiBold' },
});

import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator, Modal, Animated } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { hasReachedGenerationLimit, incrementGenerationCount } from "../utils/VisualiserStorage";
import { generateVisualiserImage } from "../utils/VisualiserApi";
import { Ionicons, Feather } from "@expo/vector-icons";
import PrimaryButton from "../components/PrimaryButton";
import { BlurView } from "expo-blur";
import * as FileSystem from "expo-file-system";

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
  const [imageUri, setImageUri] = useState(null);
  const [windowColor, setWindowColor] = useState("White");
  const [doorColor, setDoorColor] = useState("None");
  const [style, setStyle] = useState("Keep Existing");
  const [isGenerating, setIsGenerating] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownSelected, setDropdownSelected] = useState("");
  const [dropdownOnSelect, setDropdownOnSelect] = useState(() => () => {});
  const [dropdownTitle, setDropdownTitle] = useState("");

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
      Alert.alert("Limit Reached", "You have reached your visualization limit for this device.");
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
      Alert.alert("Limit Reached", "You have reached the maximum allowed generations for this device.");
      return;
    }

    setIsGenerating(true);
    try {
      // Setup options
      const options = {
        windowColor,
        doorColor: doorColor !== "None" ? doorColor : null,
        style: style !== "Keep Existing" ? style : null,
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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>AI Visualiser</Text>
      <Text style={styles.subtitle}>See what new windows and doors will look like on your house.</Text>

      {/* Image Uploader */}
      <View style={styles.uploadSection}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Ionicons name="home-outline" size={48} color="#9CA3AF" />
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

      {/* Configuration Form */}
      <View style={styles.configSection}>
        <DropdownInput label="Window Colour" value={windowColor} options={WINDOW_COLORS} onSelect={setWindowColor} />
        <DropdownInput label="Door Colour (Optional)" value={doorColor} options={DOOR_COLORS} onSelect={setDoorColor} />
        <DropdownInput label="Style (Optional)" value={style} options={STYLES} onSelect={setStyle} />
      </View>

      {limitReached ? (
        <View style={styles.limitContainer}>
          <Text style={styles.limitText}>Generation limit reached for this device.</Text>
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
  sectionTitle: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
    color: "#374151",
    marginBottom: 12,
    marginTop: 16,
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
});

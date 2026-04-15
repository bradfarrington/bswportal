import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { hasReachedGenerationLimit, incrementGenerationCount } from "../utils/VisualiserStorage";
import { generateVisualiserImage } from "../utils/VisualiserApi";
import { Ionicons } from "@expo/vector-icons";

const WINDOW_COLORS = ["White", "Anthracite Grey", "Black", "Chartwell Green"];
const DOOR_COLORS = ["None", "White", "Anthracite Grey", "Black", "Chartwell Green"];
const STYLES = ["Keep Existing", "Modern", "Traditional"];

export default function VisualiserScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [windowColor, setWindowColor] = useState("White");
  const [doorColor, setDoorColor] = useState("None");
  const [style, setStyle] = useState("Keep Existing");
  const [isGenerating, setIsGenerating] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    checkLimits();
  }, []);

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

      // Navigate to results screen
      navigation.navigate("VisualiserResult", { 
        originalImage: imageUri,
        generatedImage: finalImageUrl,
        options 
      });
    } catch (error) {
      Alert.alert("Generation Failed", error.message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
      checkLimits();
    }
  };

  const renderPills = (options, selectedValue, onSelect) => {
    return (
      <View style={styles.pillContainer}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.pill, selectedValue === opt && styles.pillSelected]}
            onPress={() => onSelect(opt)}
          >
            <Text style={[styles.pillText, selectedValue === opt && styles.pillTextSelected]}>
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

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
        <Text style={styles.sectionTitle}>Window Colour</Text>
        {renderPills(WINDOW_COLORS, windowColor, setWindowColor)}

        <Text style={styles.sectionTitle}>Door Colour (Optional)</Text>
        {renderPills(DOOR_COLORS, doorColor, setDoorColor)}

        <Text style={styles.sectionTitle}>Style (Optional)</Text>
        {renderPills(STYLES, style, setStyle)}
      </View>

      {limitReached ? (
        <View style={styles.limitContainer}>
          <Text style={styles.limitText}>Generation limit reached for this device.</Text>
        </View>
      ) : (
        <TouchableOpacity 
          style={[styles.generateButton, (!imageUri || isGenerating) && styles.generateButtonDisabled]} 
          onPress={handleGenerate}
          disabled={!imageUri || isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
          ) : (
            <Ionicons name="color-wand-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          )}
          <Text style={styles.generateButtonText}>
            {isGenerating ? "Generating..." : "Generate Preview"}
          </Text>
        </TouchableOpacity>
      )}
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
    backgroundColor: "#EFF6FF",
    borderColor: "#3B82F6",
  },
  pillText: {
    fontFamily: "InterMedium",
    color: "#6B7280",
    fontSize: 14,
  },
  pillTextSelected: {
    color: "#2563EB",
    fontFamily: "InterSemiBold",
  },
  generateButton: {
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  generateButtonDisabled: {
    backgroundColor: "#9CA3AF",
    shadowOpacity: 0,
    elevation: 0,
  },
  generateButtonText: {
    color: "#FFF",
    fontFamily: "InterBold",
    fontSize: 18,
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
  }
});

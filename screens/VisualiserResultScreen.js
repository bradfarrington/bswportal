import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Alert, 
  Dimensions, 
  PanResponder, 
  ActivityIndicator,
  Linking,
  ScrollView
} from "react-native";
import { Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get("window");
const IMAGE_WIDTH = screenWidth - 32;
const IMAGE_HEIGHT = IMAGE_WIDTH;

export default function VisualiserResultScreen({ route, navigation }) {
  const { originalImage, generatedImage, options } = route.params;

  const [sliderPosition, setSliderPosition] = useState(IMAGE_WIDTH / 2);
  const [isSaving, setIsSaving] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => setScrollEnabled(false),
      onPanResponderMove: (evt, gestureState) => {
        let newX = gestureState.moveX - 16;
        if (newX < 0) newX = 0;
        if (newX > IMAGE_WIDTH) newX = IMAGE_WIDTH;
        setSliderPosition(newX);
      },
      onPanResponderRelease: () => setScrollEnabled(true),
      onPanResponderTerminate: () => setScrollEnabled(true),
    })
  ).current;

  const handleDownload = async () => {
    console.log("[Save] Button pressed");
    console.log("[Save] URI:", generatedImage?.substring(0, 80));
    try {
      setIsSaving(true);

      if (!generatedImage) {
        Alert.alert("Error", "Image is still loading, please wait a moment.");
        setIsSaving(false);
        return;
      }

      // Try saving directly to camera roll (skip requestPermissionsAsync which has a known native crash in this RN version)
      try {
        console.log("[Save] Attempting MediaLibrary.saveToLibraryAsync...");
        await MediaLibrary.saveToLibraryAsync(generatedImage);
        console.log("[Save] MediaLibrary save succeeded!");
        Alert.alert("Saved!", "The image has been saved to your camera roll.");
        return;
      } catch (mlError) {
        console.warn("[Save] MediaLibrary failed, falling back to share sheet:", mlError);
      }

      // Fallback: use share sheet
      console.log("[Save] Using share sheet fallback...");
      await Sharing.shareAsync(generatedImage, {
        UTI: "public.image",
        mimeType: "image/png",
      });
    } catch (error) {
      console.error("[Save] Error:", error);
      Alert.alert("Error", "Failed to save the image. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRequestQuote = () => {
    const subject = `Quote Request from Visualiser: ${options.windowColor} Windows`;
    let body = `Hi BSW Team,\n\nI generated a visualisation and would like a quote.\n\nDetails:\n- Window Colour: ${options.windowColor}\n`;
    if (options.doorColor) body += `- Door Colour: ${options.doorColor}\n`;
    if (options.style) body += `- Style: ${options.style}\n`;
    body += `\nPlease see my attached images in follow-up.`;
    
    Linking.openURL(`mailto:sales@bswwindowbuilder.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView scrollEnabled={scrollEnabled} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#111" />
            </TouchableOpacity>
            <Text style={styles.title}>Your Results</Text>
            <View style={{width: 24}} />
        </View>

        <Text style={styles.subtitle}>Drag the slider to compare before and after.</Text>

        {/* Image Comparison Slider */}
          <View style={styles.imageContainer}>
            {/* Original Image (Background) */}
            <Image source={{ uri: originalImage }} style={styles.baseImage} resizeMode="cover" />
            {/* Before Label overlay on original */}
            <View style={styles.beforeLabel}><Text style={styles.labelText}>Before</Text></View>

            {/* Generated Image (Foreground, clipped) */}
            <View style={[styles.overlayContainer, { width: sliderPosition }]}>
              <Image source={{ uri: generatedImage }} style={styles.overlayImage} resizeMode="cover" />
              {/* After label overlay on generated */}
              <View style={styles.afterLabel}><Text style={styles.labelText}>After</Text></View>
              
              {/* Semi-transparent watermark overlay covering the generated image */}
              <View style={styles.watermarkOverlay} pointerEvents="none">
                  <Image 
                    source={require("../assets/composite-doors/background-1-no-bg.png")} 
                    style={styles.watermarkImageFull} 
                    resizeMode="cover" 
                  />
              </View>
            </View>

            {/* Scrubber Handle */}
            <View style={[styles.scrubberLine, { left: sliderPosition }]} {...panResponder.panHandlers}>
              <View style={styles.scrubberKnob}>
                <Ionicons name="swap-horizontal" size={20} color="#E5040A" />
              </View>
            </View>
          </View>

        <View style={styles.optionsCard}>
          <Text style={styles.optionsTitle}>Selections Applied</Text>
          <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Window Colour:</Text>
              <Text style={styles.optionValue}>{options.windowColor}</Text>
          </View>
          {options.doorColor && (
            <View style={styles.optionRow}>
                <Text style={styles.optionLabel}>Door Colour:</Text>
                <Text style={styles.optionValue}>{options.doorColor}</Text>
            </View>
          )}
          {options.style && (
            <View style={styles.optionRow}>
                <Text style={styles.optionLabel}>Style:</Text>
                <Text style={styles.optionValue}>{options.style}</Text>
            </View>
          )}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.downloadButton} onPress={handleDownload} disabled={isSaving}>
            {isSaving ? <ActivityIndicator color="#fff" /> : <Ionicons name="download-outline" size={20} color="#fff" />}
            <Text style={styles.downloadText}>{isSaving ? "Saving..." : "Save Image"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quoteButton} onPress={handleRequestQuote}>
            <Ionicons name="mail-outline" size={20} color="#111827" />
            <Text style={styles.quoteText}>Request Quote</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.regenerateButton} onPress={() => navigation.goBack()}>
            <Ionicons name="refresh-outline" size={20} color="#6B7280" />
            <Text style={styles.regenerateText}>Try Another Image</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 48,
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
      marginTop: 8,
  },
  title: {
    fontFamily: "InterBold",
    fontSize: 24,
    color: "#111827",
  },
  backButton: {
      padding: 4,
  },
  subtitle: {
    fontFamily: "InterMedium",
    fontSize: 15,
    color: "#4B5563",
    marginBottom: 20,
    textAlign: "center",
  },
  imageContainer: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  baseImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlayContainer: {
    height: IMAGE_HEIGHT,
    position: "absolute",
    left: 0,
    top: 0,
    overflow: "hidden",
  },
  overlayImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  scrubberLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "#FFF",
    marginLeft: -2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  scrubberKnob: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  beforeLabel: {
      position: 'absolute',
      left: 12,
      top: 12,
      backgroundColor: 'rgba(0,0,0,0.6)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 16,
  },
  afterLabel: {
      position: 'absolute',
      left: 12,
      top: 12,
      backgroundColor: 'rgba(229, 4, 10, 0.8)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 16,
  },
  labelText: {
      color: '#fff',
      fontFamily: 'InterSemiBold',
      fontSize: 12,
  },
  watermarkOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.15,
  },
  watermarkImageFull: {
      width: '100%',
      height: '100%',
  },
  optionsCard: {
    backgroundColor: "#FFF",
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  optionsTitle: {
      fontFamily: "InterSemiBold",
      fontSize: 16,
      color: "#111827",
      marginBottom: 12,
  },
  optionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 6,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6'
  },
  optionLabel: {
      color: '#6B7280',
      fontFamily: 'InterMedium'
  },
  optionValue: {
      color: '#111827',
      fontFamily: 'InterSemiBold'
  },
  actionsContainer: {
    marginTop: 24,
    gap: 12,
  },
  downloadButton: {
    backgroundColor: "#E5040A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
  },
  downloadText: {
    color: "#FFF",
    fontFamily: "InterBold",
    fontSize: 16,
    marginLeft: 8,
  },
  quoteButton: {
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
  },
  quoteText: {
    color: "#111827",
    fontFamily: "InterBold",
    fontSize: 16,
    marginLeft: 8,
  },
  regenerateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  regenerateText: {
    color: "#6B7280",
    fontFamily: "InterSemiBold",
    fontSize: 15,
    marginLeft: 8,
  },
});

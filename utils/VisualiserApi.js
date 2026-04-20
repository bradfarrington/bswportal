import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

// Production Supabase Edge Function URL
const BACKEND_URL = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/generate-image`;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Compresses and resizes the image before sending to save bandwidth and memory.
 */
export const prepareImageForUpload = async (imageUri) => {
  try {
    const result = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 1024 } }], 
      { format: ImageManipulator.SaveFormat.JPEG, compress: 0.8 }
    );
    return result;
  } catch (err) {
    console.error("Failed to prepare image:", err);
    throw new Error("Unable to process the selected image.");
  }
};

/**
 * Sends the image and user options to the generation backend.
 * Uses base64 JSON body instead of FormData for reliable RN networking.
 */
export const generateVisualiserImage = async (imageUri, options) => {
  const { windowColor, doorColor, style, customPrompt } = options;
  
  if (!windowColor) {
    throw new Error("Window Colour is required");
  }

  try {
    console.log("[Visualiser] Preparing image...");
    const processedImage = await prepareImageForUpload(imageUri);

    // Read the processed image as base64
    console.log("[Visualiser] Converting to base64...");
    const base64 = await FileSystem.readAsStringAsync(processedImage.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log(`[Visualiser] Base64 length: ${base64.length}`);

    const body = {
      imageBase64: base64,
      windowColor,
      doorColor: doorColor || null,
      style: style || null,
      customPrompt: customPrompt || null,
    };

    console.log(`[Visualiser] Sending to: ${BACKEND_URL}`);

    // OpenAI image generation can take 30-90s
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 180000); // 180s max wait

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    console.log(`[Visualiser] Response status: ${response.status}`);

    const responseData = await response.json();

    if (!response.ok) {
      console.error("[Visualiser] Server error:", responseData);
      throw new Error(responseData.error || "Failed to edit image on backend.");
    }

    if (!responseData.data || !responseData.data.url) {
      throw new Error("Invalid response format received from backend.");
    }

    console.log("[Visualiser] Success!");
    return responseData.data.url;
  } catch (error) {
    console.error("generateVisualiserImage Error:", error);
    if (error.name === "AbortError") {
      throw new Error("Request timed out. The server took too long to respond.");
    }
    throw error;
  }
};

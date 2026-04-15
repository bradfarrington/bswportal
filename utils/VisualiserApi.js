import * as ImageManipulator from "expo-image-manipulator";

// Production Supabase Edge Function URL
const BACKEND_URL = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/generate-image`;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Compresses and resizes the image before sending to save bandwidth and memory.
 */
export const prepareImageForUpload = async (imageUri) => {
  try {
    // Max width/height to keep it within safe boundaries and OpenAI limits (1024 to 1536 max)
    const result = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 1024 } }], 
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    return result;
  } catch (err) {
    console.error("Failed to prepare image:", err);
    throw new Error("Unable to process the selected image.");
  }
};

/**
 * Sends the image and user options to the generation backend.
 */
export const generateVisualiserImage = async (imageUri, options) => {
  const { windowColor, doorColor, style } = options;
  
  if (!windowColor) {
    throw new Error("Window Colour is required");
  }

  try {
    const processedImage = await prepareImageForUpload(imageUri);

    const formData = new FormData();
    formData.append("image", {
      uri: processedImage.uri,
      name: "upload.jpg",
      type: "image/jpeg",
    });
    formData.append("windowColor", windowColor);
    if (doorColor) formData.append("doorColor", doorColor);
    if (style) formData.append("style", style);

    // Timeout handled by the Edge function usually, but we can set a local timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000); // 35s max wait

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: formData,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.error || "Failed to edit image on backend.");
    }

    if (!responseData.data || !responseData.data.url) {
        throw new Error("Invalid response format received from backend.");
    }

    // OpenAI returns the URL of the generated image
    return responseData.data.url;
  } catch (error) {
    console.error("generateVisualiserImage Error:", error);
    if (error.name === "AbortError") {
      throw new Error("Request timed out. The server took too long to respond.");
    }
    throw error; // Re-throw so UI can handle it gracefully.
  }
};

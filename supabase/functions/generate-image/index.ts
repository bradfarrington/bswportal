import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function buildPrompt(windowColor: string, doorColor?: string, style?: string): string {
  let prompt = `This is a photo of a real house. Make a minimal, surgical edit: recolour ONLY the window frames (the UPVC or timber surrounds of each glass window pane) to ${windowColor}. `;

  if (doorColor) {
    prompt += `Also recolour ONLY the front door panel to ${doorColor}. `;
  } else {
    prompt += "Do NOT change the front door, door frame, door surround, or door threshold in any way — they must stay their original colour. ";
  }

  if (style === "Modern") {
    prompt += "Give the window frames a sleek, modern profile. ";
  } else if (style === "Traditional") {
    prompt += "Give the window frames a traditional profile. ";
  }

  prompt +=
    "CRITICAL: Every single pixel outside the window frames must remain IDENTICAL to the original photo. " +
    "Do NOT alter, add, remove, or reimagine any of the following: " +
    "the front door, door frame, door surround, door threshold, " +
    "the driveway, ground, path, pavement, tarmac, gravel, grass, lawn, garden, plants, bushes, trees, " +
    "fascia boards, soffits, guttering, downpipes, bargeboards, roof tiles, chimney, " +
    "brickwork, render, walls, porch, canopy, garage door, fences, gates, bins, cars, " +
    "sky, clouds, lighting, shadows, reflections, or any background elements. " +
    "Window frames means ONLY the frames around glass window panes — NOT the door frame. " +
    "The edit must be so subtle that if you cover the window frames, the rest of the image looks pixel-for-pixel identical to the original. " +
    "Photorealistic result, same camera angle, same lighting, same composition.";

  return prompt;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { imageBase64, windowColor, doorColor, style } = await req.json();

    if (!imageBase64 || !windowColor) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: imageBase64 and windowColor" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Decode the base64 string into a Blob for OpenAI
    const binaryString = atob(imageBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const imageBlob = new Blob([bytes], { type: "image/jpeg" });

    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiKey) {
      return new Response(
        JSON.stringify({ error: "OPENAI_API_KEY not configured on server." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const prompt = buildPrompt(windowColor, doorColor ?? undefined, style ?? undefined);
    console.log("Prompt:", prompt);

    // Build multipart form for OpenAI's /v1/images/edits endpoint
    // This is the SAME model that powers ChatGPT's image editing
    const openaiForm = new FormData();
    openaiForm.append("model", "gpt-image-1");
    openaiForm.append("image", imageBlob, "photo.png");
    openaiForm.append("prompt", prompt);
    openaiForm.append("size", "auto");          // Preserve original aspect ratio
    openaiForm.append("quality", "high");

    console.log("Sending to OpenAI gpt-image-1 edit endpoint...");

    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiKey}`,
      },
      body: openaiForm,
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", JSON.stringify(result));
      throw new Error(result.error?.message || "OpenAI image edit failed.");
    }

    console.log("OpenAI edit complete, processing result...");

    const imageData = result.data?.[0];
    if (!imageData) {
      throw new Error("OpenAI did not return a valid result.");
    }

    // gpt-image-1 returns b64_json by default — convert to a data URI
    let resultUrl: string;
    if (imageData.url) {
      resultUrl = imageData.url;
    } else if (imageData.b64_json) {
      resultUrl = `data:image/png;base64,${imageData.b64_json}`;
    } else {
      throw new Error("Unexpected response format from OpenAI.");
    }

    // Response format matches the frontend expectation
    return new Response(
      JSON.stringify({
        success: true,
        data: { url: resultUrl },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Edge Function Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to edit image." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

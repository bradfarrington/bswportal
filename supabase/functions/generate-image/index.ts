import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function buildPrompt(windowColor, doorColor, style) {
  let prompt = `Edit this uploaded photo of a real house. Change the window frame colour to ${windowColor}.`;
  
  if (doorColor) {
    prompt += ` Also change the front door colour to ${doorColor}.`;
  }
  
  prompt += ` Keep the structure, camera angle, perspective, composition, and lighting identical. Keep the result photorealistic. Only modify the windows and door where relevant. Do not change walls, brickwork, render, roof, driveway, garden, sky, vehicles, or surroundings. Do not redesign the property.`;

  if (style === "Modern") {
    prompt += " Make the window styling slightly more modern while preserving realism and the original house design.";
  } else if (style === "Traditional") {
    prompt += " Make the window styling slightly more traditional while preserving realism and the original house design.";
  }

  return prompt;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const windowColor = formData.get("windowColor");
    const doorColor = formData.get("doorColor");
    const style = formData.get("style");

    if (!image || !windowColor) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: image and windowColor" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const openAiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openAiKey) {
      return new Response(
        JSON.stringify({ error: "OPENAI_API_KEY not configured on server." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const prompt = buildPrompt(windowColor, doorColor, style);

    // Call OpenAI Image Edit API
    const openAiFormData = new FormData();
    openAiFormData.append("image", image); // MUST be a valid PNG < 4MB
    openAiFormData.append("prompt", prompt);
    openAiFormData.append("n", "1");
    // 'dall-e-2' is the only model supported for the edits endpoint currently unless DALL-E 3 added edits.
    // OpenAI Docs: The edits endpoint works with dall-e-2. 
    openAiFormData.append("model", "dall-e-2");
    // Ensure the size is appropriate or let OpenAI default to whatever sizes it accepts (e.g., 1024x1024, 512x512, 256x256).
    // Let's use 1024x1024 which is standard for dall-e-2 limits.
    openAiFormData.append("size", "1024x1024");
    openAiFormData.append("response_format", "url");

    const abortController = new AbortController();
    // 25 second timeout
    const timeoutId = setTimeout(() => abortController.abort(), 25000);

    const openAiResponse = await fetch("https://api.openai.com/v1/images/edits", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${openAiKey}`,
        },
        body: openAiFormData,
        signal: abortController.signal,
    });
    clearTimeout(timeoutId);

    const result = await openAiResponse.json();

    if (!openAiResponse.ok) {
        console.error("OpenAI Error:", result);
        return new Response(
            JSON.stringify({ error: result.error?.message || "Failed to edit image." }),
            { status: openAiResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: result.data[0], // { url: "..." }
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Edge Function Error:", error);
    if (error.name === "AbortError") {
        return new Response(
            JSON.stringify({ error: "The request exceeded the maximum allowed timeout (25 seconds). Please try again." }),
            { status: 408, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

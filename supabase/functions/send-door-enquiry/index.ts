import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  postcode?: string;
  feedback?: string;
  outsideImageUrl?: string;
  insideImageUrl?: string;
  viewOnHomeImageUrl?: string;
  doorSpec: {
    doorStyle?: string;
    externalColour?: string;
    internalColour?: string;
    frameColour?: string;
    glass?: string;
    handle?: string;
    letterplate?: string;
    knocker?: string;
  };
}

function buildEmailHtml(data: EnquiryPayload): string {
  const spec = data.doorSpec || {};
  const specRows = [
    { label: "Door Style", value: spec.doorStyle },
    { label: "External Colour", value: spec.externalColour },
    { label: "Internal Colour", value: spec.internalColour },
    { label: "Frame Colour", value: spec.frameColour },
    { label: "Glass", value: spec.glass },
    { label: "Handle", value: spec.handle },
    { label: "Letterplate", value: spec.letterplate },
    { label: "Knocker", value: spec.knocker },
  ].filter((r) => r.value);

  const hasOutside = !!data.outsideImageUrl;
  const hasInside = !!data.insideImageUrl;
  const hasViewOnHome = !!data.viewOnHomeImageUrl;
  const hasAnyImage = hasOutside || hasInside || hasViewOnHome;

  // Build door images section
  let doorImagesHtml = "";
  if (hasAnyImage) {
    const imageCount = (hasOutside ? 1 : 0) + (hasInside ? 1 : 0) + (hasViewOnHome ? 1 : 0);
    const imageWidth = imageCount >= 2 ? "32%" : "60%";
    
    doorImagesHtml = `
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <h2 style="color:#111; font-size:16px; margin:0 0 16px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">
                Door Preview
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  ${hasOutside ? `
                  <td align="center" style="width:${imageWidth}; padding: 4px; vertical-align:top;">
                    <img src="${data.outsideImageUrl}" alt="Outside View" style="max-width:100%; height:auto; border-radius:8px; border:1px solid #f0f0f0;" />
                    <p style="color:#6b7280; font-size:12px; margin:8px 0 0 0; text-align:center; font-weight:600;">Outside</p>
                  </td>` : ""}
                  ${hasInside ? `
                  <td align="center" style="width:${imageWidth}; padding: 4px; vertical-align:top;">
                    <img src="${data.insideImageUrl}" alt="Inside View" style="max-width:100%; height:auto; border-radius:8px; border:1px solid #f0f0f0;" />
                    <p style="color:#6b7280; font-size:12px; margin:8px 0 0 0; text-align:center; font-weight:600;">Inside</p>
                  </td>` : ""}
                  ${hasViewOnHome ? `
                  <td align="center" style="width:${imageWidth}; padding: 4px; vertical-align:top;">
                    <img src="${data.viewOnHomeImageUrl}" alt="View on Home" style="max-width:100%; height:auto; border-radius:8px; border:1px solid #f0f0f0;" />
                    <p style="color:#6b7280; font-size:12px; margin:8px 0 0 0; text-align:center; font-weight:600;">On Home</p>
                  </td>` : ""}
                </tr>
              </table>
            </td>
          </tr>`;
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#f4f4f5; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="background-color:#e5040a; padding: 24px 32px;">
              <h1 style="color:#ffffff; margin:0; font-size:22px; font-weight:700;">
                🚪 New Door Enquiry
              </h1>
              <p style="color:rgba(255,255,255,0.85); margin:6px 0 0 0; font-size:14px;">
                Received from the BSW Portal Door Designer
              </p>
            </td>
          </tr>
          
          <!-- Door Images -->
          ${doorImagesHtml}

          <!-- Customer Details -->
          <tr>
            <td style="padding: 28px 32px 20px 32px;">
              <h2 style="color:#111; font-size:16px; margin:0 0 16px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">
                Customer Details
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 8px 0; color:#6b7280; font-size:14px; width:140px;">Name</td>
                  <td style="padding: 8px 0; color:#111; font-size:14px; font-weight:600;">${escapeHtml(data.name)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color:#6b7280; font-size:14px;">Email</td>
                  <td style="padding: 8px 0; color:#111; font-size:14px; font-weight:600;">
                    <a href="mailto:${escapeHtml(data.email)}" style="color:#e5040a; text-decoration:none;">${escapeHtml(data.email)}</a>
                  </td>
                </tr>
                ${data.phone ? `<tr>
                  <td style="padding: 8px 0; color:#6b7280; font-size:14px;">Phone</td>
                  <td style="padding: 8px 0; color:#111; font-size:14px; font-weight:600;">${escapeHtml(data.phone)}</td>
                </tr>` : ""}
                ${data.postcode ? `<tr>
                  <td style="padding: 8px 0; color:#6b7280; font-size:14px;">Postcode</td>
                  <td style="padding: 8px 0; color:#111; font-size:14px; font-weight:600;">${escapeHtml(data.postcode)}</td>
                </tr>` : ""}
              </table>
            </td>
          </tr>

          <!-- Door Specification -->
          ${specRows.length > 0 ? `
          <tr>
            <td style="padding: 0 32px 20px 32px;">
              <h2 style="color:#111; font-size:16px; margin:0 0 16px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">
                Door Specification
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa; border-radius:8px; overflow:hidden;">
                ${specRows.map((row, i) => `
                <tr style="border-bottom: 1px solid #f0f0f0;">
                  <td style="padding: 10px 16px; color:#6b7280; font-size:14px; width:140px; ${i === specRows.length - 1 ? "" : "border-bottom: 1px solid #f0f0f0;"}">${row.label}</td>
                  <td style="padding: 10px 16px; color:#111; font-size:14px; font-weight:600; ${i === specRows.length - 1 ? "" : "border-bottom: 1px solid #f0f0f0;"}">${escapeHtml(row.value!)}</td>
                </tr>`).join("")}
              </table>
            </td>
          </tr>` : ""}

          <!-- Feedback / Notes -->
          ${data.feedback ? `
          <tr>
            <td style="padding: 0 32px 20px 32px;">
              <h2 style="color:#111; font-size:16px; margin:0 0 12px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">
                Additional Notes
              </h2>
              <p style="color:#374151; font-size:14px; line-height:1.6; margin:0; background:#fafafa; padding:14px 16px; border-radius:8px;">
                ${escapeHtml(data.feedback)}
              </p>
            </td>
          </tr>` : ""}

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px 28px 32px; border-top: 1px solid #f3f4f6;">
              <p style="color:#9ca3af; font-size:12px; margin:0; text-align:center;">
                Sent from the BSW Portal Door Designer App
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload: EnquiryPayload = await req.json();

    // Validate required fields
    if (!payload.name?.trim() || !payload.email?.trim()) {
      return new Response(
        JSON.stringify({ error: "Name and email are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get SMTP config from environment
    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "465");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPass = Deno.env.get("SMTP_PASS");
    const smtpFrom = Deno.env.get("SMTP_FROM") || smtpUser;
    const smtpTo = Deno.env.get("SMTP_TO") || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("SMTP environment variables not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[SendDoorEnquiry] Sending enquiry from ${payload.name} (${payload.email})`);
    if (payload.outsideImageUrl) console.log(`[SendDoorEnquiry] Outside image: ${payload.outsideImageUrl}`);
    if (payload.insideImageUrl) console.log(`[SendDoorEnquiry] Inside image: ${payload.insideImageUrl}`);
    if (payload.viewOnHomeImageUrl) console.log(`[SendDoorEnquiry] View on home image: ${payload.viewOnHomeImageUrl}`);

    // Build email content
    const htmlBody = buildEmailHtml(payload);
    const subject = `Door Enquiry from ${payload.name}${payload.postcode ? ` — ${payload.postcode}` : ""}`;

    // Connect and send via SMTP
    const client = new SMTPClient({
      connection: {
        hostname: smtpHost,
        port: smtpPort,
        tls: true,
        auth: {
          username: smtpUser,
          password: smtpPass,
        },
      },
    });

    await client.send({
      from: smtpFrom!,
      to: smtpTo!,
      replyTo: payload.email,
      subject: subject,
      content: `Door enquiry from ${payload.name} (${payload.email})`,
      html: htmlBody,
    });

    await client.close();

    console.log("[SendDoorEnquiry] Email sent successfully!");

    return new Response(
      JSON.stringify({ success: true, message: "Enquiry sent successfully." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[SendDoorEnquiry] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send enquiry." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EnquiryPayload {
  product_title: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  quantity?: string | number;
  preferences?: string;
  imageUrls?: string[];
}

function buildEmailHtml(data: EnquiryPayload): string {
  // Build images section
  let imagesHtml = "";
  if (data.imageUrls && data.imageUrls.length > 0) {
    const imgTags = data.imageUrls.map((url, i) => `
                <tr>
                  <td align="center" style="padding: 8px; vertical-align:top;">
                    <img src="${url}" alt="Customer Photo ${i + 1}" style="max-width:100%; height:auto; border-radius:8px; border:1px solid #f0f0f0;" />
                    <p style="color:#6b7280; font-size:12px; margin:8px 0 16px 0; text-align:center; font-weight:600;">Photo ${i + 1}</p>
                  </td>
                </tr>`).join("");

    imagesHtml = `
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <h2 style="color:#111; font-size:16px; margin:0 0 16px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">
                Customer Property Photos
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${imgTags}
              </table>
            </td>
          </tr>`;
  }

  // Preferences as list
  let preferencesList = "";
  if (data.preferences && data.preferences !== 'None specified') {
    const listItems = data.preferences
      .split('\n')
      .map(line => `<li style="margin-bottom:6px;">${escapeHtml(line)}</li>`)
      .join("");
      
    preferencesList = `
          <tr>
            <td style="padding: 0 32px 20px 32px;">
              <h2 style="color:#111; font-size:16px; margin:0 0 16px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">
                Selected Preferences
              </h2>
              <div style="background:#fafafa; border-radius:8px; padding: 14px 24px;">
                <ul style="color:#111; font-size:14px; line-height:1.6; margin:0; padding:0; padding-left:16px; font-family: Arial, Helvetica, sans-serif; font-weight:600;">
                  ${listItems}
                </ul>
              </div>
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
                📦 New Product Enquiry
              </h1>
              <p style="color:rgba(255,255,255,0.85); margin:6px 0 0 0; font-size:14px;">
                Enquiry for: <strong>${escapeHtml(data.product_title)}</strong>
              </p>
            </td>
          </tr>
          
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
                <tr>
                  <td style="padding: 8px 0; color:#6b7280; font-size:14px;">Quantity</td>
                  <td style="padding: 8px 0; color:#111; font-size:14px; font-weight:600;">${escapeHtml(String(data.quantity || 1))}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Product Preferences -->
          ${preferencesList}

          <!-- Images -->
          ${imagesHtml}

          <!-- Feedback / Notes -->
          ${data.notes && data.notes !== 'None' ? `
          <tr>
            <td style="padding: 0 32px 20px 32px;">
               <h2 style="color:#111; font-size:16px; margin:0 0 12px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">
                Additional Notes
              </h2>
              <p style="color:#374151; font-size:14px; line-height:1.6; margin:0; background:#fafafa; padding:14px 16px; border-radius:8px;">
                ${escapeHtml(data.notes).replace(/\n/g, '<br/>')}
              </p>
            </td>
          </tr>` : ""}

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px 28px 32px; border-top: 1px solid #f3f4f6;">
              <p style="color:#9ca3af; font-size:12px; margin:0; text-align:center;">
                Sent from the BSW Portal Product Enquiry
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
  if (!str) return "";
  return String(str)
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
    if (!payload.product_title?.trim() || !payload.name?.trim() || !payload.email?.trim()) {
      return new Response(
        JSON.stringify({ error: "Product title, name, and email are required." }),
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

    console.log(`[SendProductEnquiry] Sending enquiry for ${payload.product_title} from ${payload.name} (${payload.email})`);

    // Build email content
    const htmlBody = buildEmailHtml(payload);
    const subject = `Product Enquiry: ${payload.product_title} — from ${payload.name}`;

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
      content: `Product enquiry for ${payload.product_title} from ${payload.name}`,
      html: htmlBody,
    });

    await client.close();

    console.log("[SendProductEnquiry] Email sent successfully!");

    return new Response(
      JSON.stringify({ success: true, message: "Enquiry sent successfully." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[SendProductEnquiry] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send enquiry." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

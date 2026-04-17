import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

/*
 * sync-door-designer Edge Function
 *
 * Re-scrapes the Entrance Door Portal WCF service and diffs against
 * the door_designer_options table in Supabase. Handles additions,
 * updates, and soft-deletions. Results are logged to door_designer_sync_log.
 *
 * Triggered weekly by pg_cron, or manually via:
 *   curl -X POST https://<ref>.supabase.co/functions/v1/sync-door-designer \
 *        -H "Authorization: Bearer <service-role-key>"
 */

// ── Config ──

const BASE_URL = "https://www.entrancedoorportal.co.uk";
const SERVICE_URL = `${BASE_URL}/Service/CompositeDoorService.svc`;
const INIT_PAGE = `${BASE_URL}/BrandedDoorDesigner.aspx?Code=1BRA02`;
const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";
const STORAGE_BUCKET = "door-designer";
const RETAIL_CATEGORIES = [101, 102, 103, 66, 11, 9, 10, 27, 12, 13, 14, 35, 17, 20, 19];

// ── Session management ──

let sessionCookies = "";

function parseCookies(str: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!str) return out;
  str.split(";").forEach((p) => {
    const [k, ...v] = p.trim().split("=");
    if (k && v.length) out[k.trim()] = v.join("=").trim();
  });
  return out;
}

async function initSession(): Promise<void> {
  const res = await fetch(INIT_PAGE, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; DoorSync/1.0)" },
    redirect: "manual",
  });

  const cookies = res.headers.getSetCookie?.() || [];
  sessionCookies = cookies.map((c: string) => c.split(";")[0]).join("; ");

  // Consume body to free resources
  await res.text();
}

async function callService(method: string, data: Record<string, unknown>): Promise<any> {
  const res = await fetch(`${SERVICE_URL}/${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Cookie: sessionCookies,
    },
    body: JSON.stringify(data),
  });

  // Update session cookies
  const newCookies = res.headers.getSetCookie?.() || [];
  if (newCookies.length > 0) {
    const existing = parseCookies(sessionCookies);
    newCookies.forEach((c: string) => {
      const [kv] = c.split(";");
      const [k, ...v] = kv.split("=");
      existing[k.trim()] = v.join("=").trim();
    });
    sessionCookies = Object.entries(existing)
      .map(([k, v]) => `${k}=${v}`)
      .join("; ");
  }

  const json = await res.json();
  const result = json[`${method}Result`];
  if (!result) throw new Error(`No ${method}Result in response`);
  if (result.ResponseType === 0) throw new Error(result.Message || "Service error");
  if (result.ResponseType === 1) throw new Error("Session expired");
  return result.Response;
}

async function startDoor(): Promise<any> {
  return callService("StartDoor", { isRetailMode: true });
}

async function updateOption(
  category: number,
  optionID: string,
  dataLinkID: string = EMPTY_GUID
): Promise<any> {
  return callService("UpdateOption", {
    optionCategory: category,
    optionID,
    dataLinkID,
    textValue: "",
  });
}

// ── Image handling ──

const processedImages = new Set<string>();

async function downloadAndUploadImage(
  supabase: any,
  storedImageID: string
): Promise<string | null> {
  if (!storedImageID || storedImageID === EMPTY_GUID) return null;
  if (processedImages.has(storedImageID)) {
    const { data } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(`${storedImageID}.png`);
    return data.publicUrl;
  }

  try {
    const imgUrl = `${BASE_URL}/GetStoredImage.ashx?ID=${storedImageID}`;
    const res = await fetch(imgUrl);
    if (!res.ok) return null;

    const buffer = new Uint8Array(await res.arrayBuffer());
    const fileName = `${storedImageID}.png`;

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, buffer, { contentType: "image/png", upsert: true });

    if (error) return null;

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);
    processedImages.add(storedImageID);
    return data.publicUrl;
  } catch {
    return null;
  }
}

// ── Scrape upstream data ──

interface UpstreamOption {
  original_id: string;
  heading_type_id: number;
  parent_option_id: string | null;
  description: string;
  sub_text: string | null;
  hover_text: string | null;
  stored_image_id: string | null;
  svg_data: string | null;
  sort_order: number;
  valid_but_hidden: boolean;
  data_link_id: string | null;
}

async function scrapeUpstream(): Promise<UpstreamOption[]> {
  const all: UpstreamOption[] = [];

  function extractOptions(
    headings: any[],
    parentOptionId: string | null = null
  ): void {
    for (const heading of headings) {
      const catId = heading.HeadingTypeID;
      if (!RETAIL_CATEGORIES.includes(catId)) continue;
      if (!heading.Options || heading.Options.length === 0) continue;

      for (let i = 0; i < heading.Options.length; i++) {
        const opt = heading.Options[i];
        all.push({
          original_id: opt.ID,
          heading_type_id: catId,
          parent_option_id: parentOptionId,
          description: opt.Description,
          sub_text: opt.SubText || null,
          hover_text: opt.HoverText || null,
          stored_image_id:
            opt.StoredImageID && opt.StoredImageID !== EMPTY_GUID
              ? opt.StoredImageID
              : null,
          svg_data: opt.SVG || null,
          sort_order: i,
          valid_but_hidden: opt.ValidButHidden || false,
          data_link_id:
            heading.DataLinkID && heading.DataLinkID !== EMPTY_GUID
              ? heading.DataLinkID
              : null,
        });
      }
    }
  }

  // Step 1: Initial session + StartDoor
  await initSession();
  const initialJob = await startDoor();
  extractOptions(initialJob.Headings);

  // Step 2: Walk each door range to get styles + dependent options
  const rangeHeading = initialJob.Headings.find(
    (h: any) => h.HeadingTypeID === 66
  );

  if (rangeHeading?.Options) {
    for (const range of rangeHeading.Options) {
      try {
        await initSession();
        await startDoor();

        const afterRange = await updateOption(
          66,
          range.ID,
          rangeHeading.DataLinkID || EMPTY_GUID
        );

        // Styles for this range
        const stylesHeading = afterRange.Headings.find(
          (h: any) => h.HeadingTypeID === 11
        );
        if (stylesHeading?.Options) {
          extractOptions([stylesHeading], range.ID);
        }

        // Colours / glass / hardware that become available for this range
        const dependentHeadings = afterRange.Headings.filter(
          (h: any) =>
            [9, 10, 27, 12, 35, 17, 20, 19, 13, 14].includes(
              h.HeadingTypeID
            ) && h.Options?.length > 0
        );
        if (dependentHeadings.length > 0) {
          extractOptions(dependentHeadings);
        }
      } catch (err) {
        console.error(`Error processing range ${range.Description}:`, err);
      }
    }
  }

  return all;
}

// ── Diff & sync ──

function makeKey(opt: { original_id: string; heading_type_id: number; parent_option_id: string | null }): string {
  return `${opt.original_id}|${opt.heading_type_id}|${opt.parent_option_id ?? "null"}`;
}

function hasChanged(upstream: UpstreamOption, existing: any): boolean {
  return (
    upstream.description !== existing.description ||
    upstream.sub_text !== existing.sub_text ||
    upstream.hover_text !== existing.hover_text ||
    upstream.stored_image_id !== existing.stored_image_id ||
    upstream.svg_data !== existing.svg_data ||
    upstream.sort_order !== existing.sort_order ||
    upstream.valid_but_hidden !== existing.valid_but_hidden
  );
}

serve(async (req: Request) => {
  // Only allow POST
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "authorization, content-type",
      },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Create sync log entry
  const { data: logEntry, error: logError } = await supabase
    .from("door_designer_sync_log")
    .insert({ status: "running" })
    .select("id")
    .single();

  if (logError) {
    return new Response(JSON.stringify({ error: "Failed to create sync log" }), {
      status: 500,
    });
  }

  const logId = logEntry.id;
  const changes: string[] = [];
  let added = 0, updated = 0, removed = 0, unchanged = 0, errors = 0;

  try {
    // 1. Scrape current upstream data
    console.log("Scraping upstream data...");
    const upstreamOptions = await scrapeUpstream();
    console.log(`Found ${upstreamOptions.length} upstream options`);

    // Deduplicate upstream (keep last occurrence — later range walks may update earlier entries)
    const upstreamMap = new Map<string, UpstreamOption>();
    for (const opt of upstreamOptions) {
      upstreamMap.set(makeKey(opt), opt);
    }
    console.log(`${upstreamMap.size} unique upstream options after dedup`);

    // 2. Fetch all existing DB records
    const { data: existingRows, error: fetchError } = await supabase
      .from("door_designer_options")
      .select("*");

    if (fetchError) throw new Error(`DB fetch error: ${fetchError.message}`);

    const existingMap = new Map<string, any>();
    for (const row of existingRows || []) {
      existingMap.set(makeKey(row), row);
    }
    console.log(`${existingMap.size} existing DB records`);

    // 3. Process additions and updates
    for (const [key, upstream] of upstreamMap) {
      const existing = existingMap.get(key);

      if (!existing) {
        // NEW — insert it
        let imageUrl = null;
        if (upstream.stored_image_id) {
          imageUrl = await downloadAndUploadImage(supabase, upstream.stored_image_id);
        }

        const { error: insertError } = await supabase
          .from("door_designer_options")
          .upsert(
            {
              ...upstream,
              image_url: imageUrl,
              is_active: true,
              last_synced_at: new Date().toISOString(),
            },
            {
              onConflict: "original_id,heading_type_id,parent_option_id",
              ignoreDuplicates: false,
            }
          );

        if (insertError) {
          errors++;
          console.error(`Insert error: ${insertError.message}`);
        } else {
          added++;
          changes.push(`ADDED: "${upstream.description}" in category ${upstream.heading_type_id}`);
        }
      } else if (hasChanged(upstream, existing) || !existing.is_active) {
        // CHANGED or was soft-deleted but now back — update it
        const updateData: Record<string, unknown> = {
          description: upstream.description,
          sub_text: upstream.sub_text,
          hover_text: upstream.hover_text,
          stored_image_id: upstream.stored_image_id,
          svg_data: upstream.svg_data,
          sort_order: upstream.sort_order,
          valid_but_hidden: upstream.valid_but_hidden,
          is_active: true,
          last_synced_at: new Date().toISOString(),
        };

        // Re-upload image if it changed
        if (upstream.stored_image_id !== existing.stored_image_id && upstream.stored_image_id) {
          updateData.image_url = await downloadAndUploadImage(supabase, upstream.stored_image_id);
        }

        const { error: updateError } = await supabase
          .from("door_designer_options")
          .update(updateData)
          .eq("id", existing.id);

        if (updateError) {
          errors++;
          console.error(`Update error: ${updateError.message}`);
        } else {
          updated++;
          const reason = !existing.is_active ? "RE-ACTIVATED" : "UPDATED";
          changes.push(`${reason}: "${upstream.description}" in category ${upstream.heading_type_id}`);
        }
      } else {
        // UNCHANGED — just touch last_synced_at
        await supabase
          .from("door_designer_options")
          .update({ last_synced_at: new Date().toISOString() })
          .eq("id", existing.id);
        unchanged++;
      }
    }

    // 4. Soft-delete options no longer upstream
    for (const [key, existing] of existingMap) {
      if (!upstreamMap.has(key) && existing.is_active) {
        const { error: removeError } = await supabase
          .from("door_designer_options")
          .update({ is_active: false, last_synced_at: new Date().toISOString() })
          .eq("id", existing.id);

        if (removeError) {
          errors++;
        } else {
          removed++;
          changes.push(`REMOVED: "${existing.description}" from category ${existing.heading_type_id}`);
        }
      }
    }

    // 5. Update sync log
    await supabase
      .from("door_designer_sync_log")
      .update({
        finished_at: new Date().toISOString(),
        added,
        updated,
        removed,
        unchanged,
        errors,
        details: changes.length > 0 ? changes : null,
        status: "completed",
      })
      .eq("id", logId);

    const summary = { added, updated, removed, unchanged, errors, changes };
    console.log("Sync complete:", JSON.stringify(summary));

    return new Response(JSON.stringify(summary), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Sync failed:", errorMsg);

    await supabase
      .from("door_designer_sync_log")
      .update({
        finished_at: new Date().toISOString(),
        errors: errors + 1,
        details: [...changes, `FATAL: ${errorMsg}`],
        status: "failed",
      })
      .eq("id", logId);

    return new Response(JSON.stringify({ error: errorMsg }), { status: 500 });
  }
});

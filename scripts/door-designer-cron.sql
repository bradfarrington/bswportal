-- Door Designer Weekly Sync — pg_cron Schedule
-- Run this in the Supabase SQL Editor AFTER deploying the Edge Function.
--
-- ⚠️  Replace <SERVICE_ROLE_KEY> with your actual Supabase service role key.
--     You can find it in: Settings > API > service_role (secret)

-- Schedule: Every Monday at 06:00 UTC
SELECT cron.schedule(
  'weekly-door-designer-sync',
  '0 6 * * 1',
  $$
  SELECT net.http_post(
    url := 'https://kmrfnaurkbmkkoumfnxp.supabase.co/functions/v1/sync-door-designer',
    headers := jsonb_build_object(
      'Authorization', 'Bearer <SERVICE_ROLE_KEY>',
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb
  );
  $$
);

-- To check scheduled jobs:
-- SELECT * FROM cron.job;

-- To see job run history:
-- SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 10;

-- To remove the schedule:
-- SELECT cron.unschedule('weekly-door-designer-sync');

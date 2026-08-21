import { createClient } from "@supabase/supabase-js";

// Same Supabase project used by the timesheet app and client onboarding form.
const SUPABASE_URL = "https://wnyfpcycjocoaajrsdgh.supabase.co";
const SUPABASE_ANON_KEY = "PASTE_YOUR_ANON_KEY_HERE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

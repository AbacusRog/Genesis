import { createClient } from "@supabase/supabase-js";

// Same Supabase project used by the timesheet app and client onboarding form.
const SUPABASE_URL = "https://wnyfpcycjocoaajrsdgh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndueWZwY3ljam9jb2FhanJzZGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxNzQzMzcsImV4cCI6MjEwMTc1MDMzN30.oWNUZ2pw0prJNm_fwbNR8bAa3T17Pu-XeE-JJCMT1Aw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

import { SUPABASE_URL, SUPABASE_KEY } from "@/config";
import { createClient } from "@supabase/supabase-js";

export const db = createClient(SUPABASE_URL, SUPABASE_KEY);
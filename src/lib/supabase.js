import { createClient } from '@supabase/supabase-js';

// Fallback to process.env guarantees Netlify serverless functions can read keys at runtime
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables.");
}

// Standard client for public frontend usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Administrative client for secure server-side writes and admin panel queries
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
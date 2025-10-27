// src/lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase URL and anonymous key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Create a single Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// You can also export a function if you need to pass additional options
// export function getSupabaseClient() {
//   return createClient(supabaseUrl, supabaseAnonKey);
// }
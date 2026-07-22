import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

// Kita buat pengecekannya lebih longgar khusus untuk kunci sb_publishable_
export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl.includes("your-project");

let client: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase belum dikonfigurasi. Set VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di .env.local",
    );
  }
  if (!client) {
    client = createClient<Database>(supabaseUrl, supabaseAnonKey);
  }
  return client;
}

export function getSupabaseSafe(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) return null;
  return getSupabase();
}

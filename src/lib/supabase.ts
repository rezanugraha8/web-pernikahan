import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Menggunakan tipe any agar tidak error jika file types belum ada
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl.includes("your-project");

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase belum dikonfigurasi. Set VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.",
    );
  }
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return client;
}

export function getSupabaseSafe(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  try {
    return getSupabase();
  } catch (e) {
    console.error("Gagal menginisialisasi client Supabase:", e);
    return null;
  }
}

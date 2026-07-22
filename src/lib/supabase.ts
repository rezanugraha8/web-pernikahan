import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pavlxefxsulmcdsuzzab.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhdmx4ZWZ4c3VsbWNkc3V6emFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2ODE1MTIsImV4cCI6MjEwMDI1NzUxMn0.bBLhalf5JVhrEWMH8MxLprO21ESOtRLOVYEVADOsyVc";

export const isSupabaseConfigured = true;

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return client;
}

export function getSupabaseSafe(): SupabaseClient | null {
  return getSupabase();
}

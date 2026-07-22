import { getSupabaseSafe } from '@/lib/supabase';
import type { Rsvp } from '@/types';

export async function fetchRsvps(): Promise<Rsvp[]> {
  const supabase = getSupabaseSafe();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('rsvp')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createRsvp(
  rsvp: Omit<Rsvp, 'id' | 'created_at'>,
): Promise<Rsvp> {
  const supabase = getSupabaseSafe();
  if (!supabase) throw new Error('Supabase tidak tersedia');

  const { data, error } = await supabase
    .from('rsvp')
    .insert(rsvp)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteRsvp(id: string): Promise<void> {
  const supabase = getSupabaseSafe();
  if (!supabase) throw new Error('Supabase tidak tersedia');

  const { error } = await supabase.from('rsvp').delete().eq('id', id);
  if (error) throw error;
}

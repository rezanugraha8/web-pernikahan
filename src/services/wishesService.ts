import { getSupabaseSafe } from '@/lib/supabase';
import type { Wish } from '@/types';

export async function fetchWishes(): Promise<Wish[]> {
  const supabase = getSupabaseSafe();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('wishes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createWish(
  wish: Omit<Wish, 'id' | 'created_at'>,
): Promise<Wish> {
  const supabase = getSupabaseSafe();
  if (!supabase) throw new Error('Supabase tidak tersedia');

  const { data, error } = await supabase
    .from('wishes')
    .insert(wish)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteWish(id: string): Promise<void> {
  const supabase = getSupabaseSafe();
  if (!supabase) throw new Error('Supabase tidak tersedia');

  const { error } = await supabase.from('wishes').delete().eq('id', id);
  if (error) throw error;
}

export function subscribeWishes(onInsert: (wish: Wish) => void) {
  const supabase = getSupabaseSafe();
  if (!supabase) return () => undefined;

  const channel = supabase
    .channel('wishes-realtime')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'wishes' },
      (payload) => {
        onInsert(payload.new as Wish);
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

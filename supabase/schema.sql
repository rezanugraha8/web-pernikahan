-- ============================================================
-- Wedding Invitation Database Schema
-- Supabase PostgreSQL
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: wishes
-- ============================================================
CREATE TABLE IF NOT EXISTS public.wishes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  message TEXT NOT NULL CHECK (char_length(message) >= 3 AND char_length(message) <= 1000),
  attendance TEXT NOT NULL CHECK (attendance IN ('hadir', 'tidak_hadir', 'ragu')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for ordering
CREATE INDEX IF NOT EXISTS idx_wishes_created_at ON public.wishes (created_at DESC);

-- ============================================================
-- TABLE: rsvp
-- ============================================================
CREATE TABLE IF NOT EXISTS public.rsvp (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  guest_count INTEGER NOT NULL DEFAULT 1 CHECK (guest_count >= 1 AND guest_count <= 20),
  attendance TEXT NOT NULL CHECK (attendance IN ('hadir', 'tidak_hadir', 'ragu')),
  note TEXT CHECK (note IS NULL OR char_length(note) <= 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for ordering
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON public.rsvp (created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvp ENABLE ROW LEVEL SECURITY;

-- Wishes: anyone can read
CREATE POLICY "wishes_select_anon"
  ON public.wishes
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Wishes: anyone can insert
CREATE POLICY "wishes_insert_anon"
  ON public.wishes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Wishes: anyone can delete (admin UI gated by client password)
CREATE POLICY "wishes_delete_anon"
  ON public.wishes
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- RSVP: anyone can read
CREATE POLICY "rsvp_select_anon"
  ON public.rsvp
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- RSVP: anyone can insert
CREATE POLICY "rsvp_insert_anon"
  ON public.rsvp
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- RSVP: anyone can delete (admin UI gated by client password)
CREATE POLICY "rsvp_delete_anon"
  ON public.rsvp
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- ============================================================
-- REALTIME
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.wishes;

-- ============================================================
-- GRANT PERMISSIONS
-- ============================================================
GRANT SELECT, INSERT, DELETE ON public.wishes TO anon, authenticated;
GRANT SELECT, INSERT, DELETE ON public.rsvp TO anon, authenticated;

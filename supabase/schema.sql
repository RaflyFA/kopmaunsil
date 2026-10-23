-- ========================================================
-- SCHEMA PORTAL ANGGOTA KOPMA UNSIL
-- Eksekusi file ini di Supabase SQL Editor (dashboard.supabase.com)
-- ========================================================

-- 1. Tabel Whitelist NRA (Data resmi anggota dari PSDA / bidang lain)
CREATE TABLE IF NOT EXISTS public.nra_whitelist (
  nra TEXT PRIMARY KEY,
  nama_lengkap TEXT NOT NULL,
  fakultas TEXT,
  prodi TEXT,
  is_claimed BOOLEAN DEFAULT false,
  claimed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  claimed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index pencarian
CREATE INDEX IF NOT EXISTS idx_nra_whitelist_nra ON public.nra_whitelist(nra);
CREATE INDEX IF NOT EXISTS idx_nra_whitelist_claimed ON public.nra_whitelist(is_claimed);

-- 2. Tabel Members (Profil anggota terdaftar yang terhubung ke Supabase Auth)
CREATE TABLE IF NOT EXISTS public.members (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nra TEXT UNIQUE NOT NULL REFERENCES public.nra_whitelist(nra),
  nama_lengkap TEXT NOT NULL,
  role TEXT DEFAULT 'anggota' CHECK (role IN ('anggota', 'pengurus', 'admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_members_nra ON public.members(nra);

-- 3. Row Level Security (RLS)
ALTER TABLE public.nra_whitelist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Policy untuk members:
-- Pengguna hanya bisa membaca data profil miliknya sendiri
CREATE POLICY "Users can view own profile"
  ON public.members FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Pengguna hanya bisa mengupdate profil miliknya sendiri
CREATE POLICY "Users can update own profile"
  ON public.members FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Service Role (backend) memiliki akses penuh
CREATE POLICY "Service role full access on members"
  ON public.members FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy untuk nra_whitelist:
-- User biasa tidak boleh browse daftar NRA anggota lain untuk mencegah kebocoran data
CREATE POLICY "Users can only read own claimed NRA"
  ON public.nra_whitelist FOR SELECT
  TO authenticated
  USING (claimed_by = auth.uid());

CREATE POLICY "Service role full access on nra_whitelist"
  ON public.nra_whitelist FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 4. Tabel Progres Belajar BAPERKU Anggota
CREATE TABLE IF NOT EXISTS public.member_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_slug TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, module_slug)
);

CREATE INDEX IF NOT EXISTS idx_member_progress_user ON public.member_progress(user_id);
ALTER TABLE public.member_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress" ON public.member_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON public.member_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress" ON public.member_progress
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Service role full access on member_progress" ON public.member_progress
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 5. Tabel Hasil Kuis BAPERKU
CREATE TABLE IF NOT EXISTS public.member_quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_slug TEXT NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, module_slug)
);

CREATE INDEX IF NOT EXISTS idx_member_quiz_user ON public.member_quiz_results(user_id);
ALTER TABLE public.member_quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quiz results" ON public.member_quiz_results
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own quiz results" ON public.member_quiz_results
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role full access on member_quiz_results" ON public.member_quiz_results
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 6. Tabel Kotak Suara & Aspirasi Anggota
CREATE TABLE IF NOT EXISTS public.aspirations (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'Sedang Ditinjau',
  upvotes INTEGER DEFAULT 1,
  tags TEXT[] DEFAULT '{}',
  admin_response TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_aspirations_created ON public.aspirations(created_at DESC);
ALTER TABLE public.aspirations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view aspirations" ON public.aspirations
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert aspirations" ON public.aspirations
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role full access on aspirations" ON public.aspirations
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 7. Tabel Dukungan Aspirasi (Upvotes)
CREATE TABLE IF NOT EXISTS public.aspiration_upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aspiration_id TEXT NOT NULL REFERENCES public.aspirations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(aspiration_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_aspiration_upvotes ON public.aspiration_upvotes(aspiration_id, user_id);
ALTER TABLE public.aspiration_upvotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view upvotes count" ON public.aspiration_upvotes
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own upvote" ON public.aspiration_upvotes
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own upvote" ON public.aspiration_upvotes
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Service role full access on aspiration_upvotes" ON public.aspiration_upvotes
  FOR ALL TO service_role USING (true) WITH CHECK (true);



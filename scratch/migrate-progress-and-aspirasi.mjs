import pg from 'pg'

const { Client } = pg

async function runMigration() {
  const client = new Client({
    host: 'db.ocavhivkpovdeysajemd.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'portal-anggota',
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
  })

  console.log('Connecting to Supabase PostgreSQL database...')
  await client.connect()
  console.log('Connected!')

  try {
    const migrationSql = `
      -- 1. Table member_progress (BAPERKU modules read)
      CREATE TABLE IF NOT EXISTS public.member_progress (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        module_slug TEXT NOT NULL,
        completed_at TIMESTAMPTZ DEFAULT now(),
        UNIQUE(user_id, module_slug)
      );

      CREATE INDEX IF NOT EXISTS idx_member_progress_user ON public.member_progress(user_id);

      -- 2. Table member_quiz_results (BAPERKU quizzes)
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

      -- 3. Table aspirations (Kotak Aspirasi Anggota)
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

      -- 4. Table aspiration_upvotes (Dukungan Aspirasi)
      CREATE TABLE IF NOT EXISTS public.aspiration_upvotes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        aspiration_id TEXT NOT NULL REFERENCES public.aspirations(id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT now(),
        UNIQUE(aspiration_id, user_id)
      );

      CREATE INDEX IF NOT EXISTS idx_aspiration_upvotes ON public.aspiration_upvotes(aspiration_id, user_id);

      -- 5. Enable RLS on all new tables
      ALTER TABLE public.member_progress ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.member_quiz_results ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.aspirations ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.aspiration_upvotes ENABLE ROW LEVEL SECURITY;

      -- Policies for member_progress
      DROP POLICY IF EXISTS "Users can view own progress" ON public.member_progress;
      CREATE POLICY "Users can view own progress" ON public.member_progress
        FOR SELECT TO authenticated USING (auth.uid() = user_id);

      DROP POLICY IF EXISTS "Users can insert own progress" ON public.member_progress;
      CREATE POLICY "Users can insert own progress" ON public.member_progress
        FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

      DROP POLICY IF EXISTS "Users can delete own progress" ON public.member_progress;
      CREATE POLICY "Users can delete own progress" ON public.member_progress
        FOR DELETE TO authenticated USING (auth.uid() = user_id);

      DROP POLICY IF EXISTS "Service role full access on member_progress" ON public.member_progress;
      CREATE POLICY "Service role full access on member_progress" ON public.member_progress
        FOR ALL TO service_role USING (true) WITH CHECK (true);

      -- Policies for member_quiz_results
      DROP POLICY IF EXISTS "Users can view own quiz results" ON public.member_quiz_results;
      CREATE POLICY "Users can view own quiz results" ON public.member_quiz_results
        FOR SELECT TO authenticated USING (auth.uid() = user_id);

      DROP POLICY IF EXISTS "Users can upsert own quiz results" ON public.member_quiz_results;
      CREATE POLICY "Users can upsert own quiz results" ON public.member_quiz_results
        FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

      DROP POLICY IF EXISTS "Service role full access on member_quiz_results" ON public.member_quiz_results;
      CREATE POLICY "Service role full access on member_quiz_results" ON public.member_quiz_results
        FOR ALL TO service_role USING (true) WITH CHECK (true);

      -- Policies for aspirations
      DROP POLICY IF EXISTS "Anyone can view aspirations" ON public.aspirations;
      CREATE POLICY "Anyone can view aspirations" ON public.aspirations
        FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Authenticated users can insert aspirations" ON public.aspirations;
      CREATE POLICY "Authenticated users can insert aspirations" ON public.aspirations
        FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

      DROP POLICY IF EXISTS "Service role full access on aspirations" ON public.aspirations;
      CREATE POLICY "Service role full access on aspirations" ON public.aspirations
        FOR ALL TO service_role USING (true) WITH CHECK (true);

      -- Policies for aspiration_upvotes
      DROP POLICY IF EXISTS "Anyone can view upvotes count" ON public.aspiration_upvotes;
      CREATE POLICY "Anyone can view upvotes count" ON public.aspiration_upvotes
        FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Users can insert own upvote" ON public.aspiration_upvotes;
      CREATE POLICY "Users can insert own upvote" ON public.aspiration_upvotes
        FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

      DROP POLICY IF EXISTS "Users can delete own upvote" ON public.aspiration_upvotes;
      CREATE POLICY "Users can delete own upvote" ON public.aspiration_upvotes
        FOR DELETE TO authenticated USING (auth.uid() = user_id);

      DROP POLICY IF EXISTS "Service role full access on aspiration_upvotes" ON public.aspiration_upvotes;
      CREATE POLICY "Service role full access on aspiration_upvotes" ON public.aspiration_upvotes
        FOR ALL TO service_role USING (true) WITH CHECK (true);
    `

    console.log('Executing migration SQL...')
    await client.query(migrationSql)
    console.log('Migration completed successfully!')
  } catch (err) {
    console.error('Migration failed:', err)
  } finally {
    await client.end()
  }
}

runMigration()

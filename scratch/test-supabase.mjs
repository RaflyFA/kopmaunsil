import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gbewdsuscqrkinolzhqj.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiZXdkc3VzY3Fya2lub2x6aHFqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MjY1ODM1MCwiZXhwIjoyMTA4MjM0MzUwfQ.a2qdJVVTryqe-I8QDRguof7aSfc5NU7_bvhO29_L98g'

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function test() {
  console.log('Testing Supabase REST connection...')
  try {
    const { data, error } = await supabase.from('nra_whitelist').select('*').limit(1)
    console.log('Query result:', { data, error })
  } catch (err) {
    console.error('Exception:', err)
  }
}

test()

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing env vars!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function testWhitelist() {
  console.log('Testing Supabase Service Role client with nra_whitelist table...')

  // 1. Invalid NRA test
  const { data: invalidData } = await supabase
    .from('nra_whitelist')
    .select('*')
    .eq('nra', '9999999')
    .maybeSingle()
  console.log('1. Invalid NRA (9999999) lookup result (should be null):', invalidData)

  // 2. Old Dummy NRA test
  const { data: oldDummyData } = await supabase
    .from('nra_whitelist')
    .select('*')
    .eq('nra', '237006012')
    .maybeSingle()
  console.log('2. Old Dummy NRA (237006012) lookup result (should be null):', oldDummyData)

  // 3. Gelombang I valid NRA
  const { data: g1Data } = await supabase
    .from('nra_whitelist')
    .select('*')
    .eq('nra', '2101001')
    .maybeSingle()
  console.log('3. Gelombang I NRA (2101001) lookup result:', g1Data)

  // 4. Gelombang II valid NRA
  const { data: g2Data } = await supabase
    .from('nra_whitelist')
    .select('*')
    .eq('nra', '2626001')
    .maybeSingle()
  console.log('4. Gelombang II NRA (2626001) lookup result:', g2Data)

  // 5. Total count
  const { count, error } = await supabase
    .from('nra_whitelist')
    .select('*', { count: 'exact', head: true })
  console.log('5. Total rows count in Supabase API (should be 214):', count)

  if (
    invalidData === null &&
    oldDummyData === null &&
    g1Data?.nama_lengkap === 'Devan Rizki Hardiansyah' &&
    g2Data?.nama_lengkap === 'Najwa shafa syahidah' &&
    count === 214
  ) {
    console.log('\n🎉 ALL WHITELIST VERIFICATION CHECKS PASSED PERFECTLY!')
  } else {
    console.error('\n⚠️ Some verification checks failed!')
    process.exitCode = 1
  }
}

testWhitelist()

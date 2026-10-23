import pg from 'pg'
import fs from 'fs'
import path from 'path'

const { Client } = pg

const client = new Client({
  host: 'db.gbewdsuscqrkinolzhqj.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: '25Maret2006.',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 15000,
})

async function importNra() {
  console.log('Connecting to PostgreSQL database...')
  await client.connect()
  console.log('Connected successfully.')

  try {
    await client.query('BEGIN')

    console.log('Step 1: Cleaning old dummy data & members...')
    await client.query('DELETE FROM public.members')
    await client.query('DELETE FROM public.nra_whitelist')
    // Clean any users from auth.users if any exist
    await client.query('DELETE FROM auth.users')
    console.log('Old dummy data cleared.')

    console.log('Step 2: Loading 214 NRA entries from scratch/nra-data.json...')
    const dataPath = path.resolve('scratch/nra-data.json')
    const rawData = fs.readFileSync(dataPath, 'utf8')
    const members = JSON.parse(rawData)

    console.log(`Found ${members.length} members to insert.`)

    const insertQuery = `
      INSERT INTO public.nra_whitelist (nra, nama_lengkap, is_claimed)
      VALUES ($1, $2, false)
      ON CONFLICT (nra) DO UPDATE 
      SET nama_lengkap = EXCLUDED.nama_lengkap,
          is_claimed = false,
          claimed_by = NULL,
          claimed_at = NULL
    `

    let inserted = 0
    for (const m of members) {
      await client.query(insertQuery, [m.nra, m.nama_lengkap])
      inserted++
    }

    await client.query('COMMIT')
    console.log(`Step 2 complete: Successfully inserted/updated ${inserted} records.`)

    // Verify
    const countRes = await client.query('SELECT count(*) as total FROM public.nra_whitelist')
    console.log(`Verification: Total rows in nra_whitelist = ${countRes.rows[0].total}`)

    const sampleRes = await client.query('SELECT nra, nama_lengkap, is_claimed FROM public.nra_whitelist ORDER BY nra ASC LIMIT 5')
    console.log('Sample data in database:', sampleRes.rows)

  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Import failed! Rolled back transaction.', err)
    process.exitCode = 1
  } finally {
    await client.end()
    console.log('Database connection closed.')
  }
}

importNra()

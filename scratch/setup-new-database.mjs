import pg from 'pg'
import fs from 'fs'
import path from 'path'

const { Client } = pg

const prodiMap = {
  '01': { prodi: 'Pendidikan Matematika', fakultas: 'FKIP' },
  '02': { prodi: 'Pendidikan Biologi', fakultas: 'FKIP' },
  '03': { prodi: 'Pendidikan Bahasa Inggris', fakultas: 'FKIP' },
  '04': { prodi: 'Pendidikan Ekonomi', fakultas: 'FKIP' },
  '05': { prodi: 'Pendidikan Geografi', fakultas: 'FKIP' },
  '06': { prodi: 'Pendidikan Bahasa Indonesia', fakultas: 'FKIP' },
  '07': { prodi: 'Pendidikan Sejarah', fakultas: 'FKIP' },
  '08': { prodi: 'Pendidikan Jasmani', fakultas: 'FKIP' },
  '09': { prodi: 'Akuntansi', fakultas: 'Fakultas Ekonomi dan Bisnis' },
  '10': { prodi: 'Manajemen', fakultas: 'Fakultas Ekonomi dan Bisnis' },
  '11': { prodi: 'Perbankan dan Keuangan', fakultas: 'Fakultas Ekonomi dan Bisnis' },
  '12': { prodi: 'Ekonomi Pembangunan', fakultas: 'Fakultas Ekonomi dan Bisnis' },
  '13': { prodi: 'Teknik Informatika', fakultas: 'Fakultas Teknik' },
  '14': { prodi: 'Teknik Sipil', fakultas: 'Fakultas Teknik' },
  '16': { prodi: 'Agribisnis', fakultas: 'Fakultas Pertanian' },
  '17': { prodi: 'Agroteknologi', fakultas: 'Fakultas Pertanian' },
  '18': { prodi: 'Ekonomi Syariah', fakultas: 'Fakultas Agama Islam' },
  '19': { prodi: 'Kesehatan Masyarakat', fakultas: 'Fakultas Ilmu Kesehatan' },
  '20': { prodi: 'Pendidikan Fisika', fakultas: 'FKIP' },
  '21': { prodi: 'Ilmu Politik', fakultas: 'Fakultas Ilmu Sosial dan Ilmu Politik' },
  '22': { prodi: 'Pendidikan Masyarakat', fakultas: 'FKIP' },
  '25': { prodi: 'Gizi', fakultas: 'Fakultas Ilmu Kesehatan' },
  '26': { prodi: 'Sistem Informasi', fakultas: 'Fakultas Teknik' },
  '27': { prodi: 'Manajemen Mutu Halal', fakultas: 'Fakultas Agama Islam' }
}

async function setupNewDatabase() {
  const client = new Client({
    host: 'db.ocavhivkpovdeysajemd.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'portal-anggota',
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
  })

  console.log('Connecting to new Supabase database...')
  await client.connect()
  console.log('Connected!')

  try {
    console.log('Step 1: Applying schema.sql...')
    const schemaSql = fs.readFileSync(path.resolve('supabase/schema.sql'), 'utf8')
    await client.query(schemaSql)
    console.log('Schema applied successfully (tables, indexes, RLS created)!')

    console.log('Step 2: Loading 214 NRA entries...')
    const rawData = fs.readFileSync(path.resolve('scratch/nra-data.json'), 'utf8')
    const members = JSON.parse(rawData)
    console.log(`Loaded ${members.length} members from file.`)

    console.log('Step 3: Inserting 214 members with prodi & fakultas...')
    await client.query('BEGIN')

    const insertQuery = `
      INSERT INTO public.nra_whitelist (nra, nama_lengkap, prodi, fakultas, is_claimed)
      VALUES ($1, $2, $3, $4, false)
      ON CONFLICT (nra) DO UPDATE
      SET nama_lengkap = EXCLUDED.nama_lengkap,
          prodi = EXCLUDED.prodi,
          fakultas = EXCLUDED.fakultas,
          is_claimed = false,
          claimed_by = NULL,
          claimed_at = NULL
    `

    let count = 0
    for (const m of members) {
      const code = m.nra.slice(2, 4)
      const info = prodiMap[code] || { prodi: null, fakultas: null }
      await client.query(insertQuery, [m.nra, m.nama_lengkap, info.prodi, info.fakultas])
      count++
    }

    await client.query('COMMIT')
    console.log(`Successfully inserted ${count} members!`)

    // Verification
    const totalRes = await client.query('SELECT count(*) as total FROM public.nra_whitelist')
    console.log('Verification total rows in nra_whitelist:', totalRes.rows[0].total)

    const sampleRes = await client.query(
      "SELECT nra, nama_lengkap, prodi, fakultas, is_claimed FROM public.nra_whitelist WHERE nra = '2602001'"
    )
    console.log('Sample Osy in database:', sampleRes.rows[0])

    console.log('\n🎉 NEW DATABASE SETUP & IMPORT COMPLETED 100% SUCCESSFULLY!')
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {})
    console.error('Setup failed:', err)
    process.exitCode = 1
  } finally {
    await client.end()
    console.log('Database connection closed.')
  }
}

setupNewDatabase()

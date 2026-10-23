import pg from 'pg'

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

async function run() {
  const { Client } = pg
  const client = new Client({
    host: 'db.gbewdsuscqrkinolzhqj.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: '25Maret2006.',
    ssl: { rejectUnauthorized: false }
  })

  await client.connect()
  const res = await client.query('SELECT nra FROM public.nra_whitelist')
  let updated = 0

  for (const row of res.rows) {
    const code = row.nra.slice(2, 4)
    const info = prodiMap[code]
    if (info) {
      await client.query(
        'UPDATE public.nra_whitelist SET prodi = $1, fakultas = $2 WHERE nra = $3',
        [info.prodi, info.fakultas, row.nra]
      )
      updated++
    }
  }

  console.log('Updated rows with prodi/fakultas:', updated)
  const sample = await client.query(
    'SELECT nra, nama_lengkap, prodi, fakultas FROM public.nra_whitelist WHERE nra = $1',
    ['2602001']
  )
  console.log('Sample Osy in DB:', sample.rows[0])
  await client.end()
}

run().catch(console.error)

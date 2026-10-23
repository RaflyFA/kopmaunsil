import pg from 'pg'
import fs from 'fs'
import path from 'path'

const { Client } = pg

const password = '25Maret2006.'
const ref = 'gbewdsuscqrkinolzhqj'

const connectionOptions = [
  {
    name: 'Direct Host',
    config: {
      host: `db.${ref}.supabase.co`,
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: password,
      ssl: { rejectUnauthorized: false },
    },
  },
]

async function run() {
  const schemaPath = path.resolve('supabase/schema.sql')
  const sql = fs.readFileSync(schemaPath, 'utf8')

  for (const opt of connectionOptions) {
    console.log(`\nConnecting to ${opt.name}...`)
    const client = new Client({
      ...opt.config,
      connectionTimeoutMillis: 10000,
    })

    try {
      await client.connect()
      console.log(`SUCCESS connected using ${opt.name}!`)
      console.log('Executing schema.sql...')
      await client.query(sql)
      console.log('ALL TABLES CREATED SUCCESSFULLY! 🎉')
      await client.end()
      process.exit(0)
    } catch (err) {
      console.log(`Failed on ${opt.name}:`, err.message)
      try {
        await client.end()
      } catch {}
    }
  }

  process.exit(1)
}

run()

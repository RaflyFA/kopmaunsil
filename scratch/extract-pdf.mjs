import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const pdf = require('pdf-parse')

const files = [
  'public/BUKU REGISTRASI ANGGOTA GELOMBANG I (2026).pdf',
  'public/BUKU REGISTRASI ANGGOTA GELOMBANG II (2026).pdf',
]

async function extractPdf(filePath) {
  const fullPath = path.resolve(filePath)
  const buffer = fs.readFileSync(fullPath)
  const data = await pdf(buffer)
  return data.text
}

async function main() {
  for (const file of files) {
    console.log(`\n${'='.repeat(80)}`)
    console.log(`FILE: ${file}`)
    console.log(`${'='.repeat(80)}\n`)
    try {
      const text = await extractPdf(file)
      // Print first 5000 chars to understand the format
      console.log(text.substring(0, 5000))
      console.log(`\n--- (Total chars: ${text.length}) ---`)
    } catch (err) {
      console.error(`Error reading ${file}:`, err.message)
    }
  }
}

main()

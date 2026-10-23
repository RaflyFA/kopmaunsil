const fs = require('fs')
const path = require('path')
const PDFParser = require('pdf2json')

const files = [
  'public/BUKU REGISTRASI ANGGOTA GELOMBANG I (2026).pdf',
  'public/BUKU REGISTRASI ANGGOTA GELOMBANG II (2026).pdf',
]

function extractPdf(filePath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(filePath)
    const pdfParser = new PDFParser()

    pdfParser.on('pdfParser_dataError', (errData) => {
      reject(new Error(errData.parserError))
    })

    pdfParser.on('pdfParser_dataReady', (pdfData) => {
      const allTexts = []
      pdfData.Pages.forEach((page, pageIndex) => {
        page.Texts.forEach((t) => {
          const text = t.R.map((r) => decodeURIComponent(r.T)).join('')
          allTexts.push({
            page: pageIndex + 1,
            x: Math.round(t.x * 100) / 100,
            y: Math.round(t.y * 100) / 100,
            text: text.trim(),
          })
        })
      })
      resolve(allTexts)
    })

    pdfParser.loadPDF(fullPath)
  })
}

function parseMembers(allTexts) {
  const members = []
  const nraPattern = /^(\d{7})$/

  for (let i = 0; i < allTexts.length; i++) {
    const item = allTexts[i]
    if (nraPattern.test(item.text)) {
      const nra = item.text
      const nraY = item.y
      const nraX = item.x

      // Collect all text parts that form the name
      // Names appear after NRA at roughly the same Y coordinate or slightly offset
      // They have a higher X value (to the right of NRA column)
      const nameParts = []
      let foundName = false

      for (let j = i + 1; j < Math.min(i + 12, allTexts.length); j++) {
        const next = allTexts[j]
        if (!next.text || next.text === ' ' || next.text === '-') continue

        // If we hit another NRA, stop
        if (nraPattern.test(next.text)) break

        // If we hit a date pattern, stop
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(next.text)) break

        // If it's a phone number (many digits), skip
        if (/^\d{9,}$/.test(next.text)) continue

        // Skip pure year numbers like 2021, 2022, etc
        if (/^20\d{2}$/.test(next.text)) break

        // Skip row numbers (1-3 digit numbers that appear before NRA)
        if (/^\d{1,3}$/.test(next.text) && !foundName) continue

        // If it's a letter-containing string, it's part of the name
        if (/[a-zA-Z]{2,}/.test(next.text)) {
          nameParts.push(next.text)
          foundName = true

          // Check if next items continue the name (same-ish Y coordinate)
          continue
        }

        // If we already found name parts and hit something non-name, stop
        if (foundName) break
      }

      const fullName = nameParts.join(' ').replace(/\s+/g, ' ').trim()

      if (fullName) {
        members.push({ nra, nama_lengkap: fullName })
      }
    }
  }

  return members
}

async function main() {
  const allMembers = []

  for (const file of files) {
    console.log(`\nProcessing: ${file}`)
    try {
      const allTexts = await extractPdf(file)
      const members = parseMembers(allTexts)
      console.log(`  Found ${members.length} members`)

      // Show some samples
      members.slice(0, 5).forEach((m) => {
        console.log(`    ${m.nra} | ${m.nama_lengkap}`)
      })
      console.log(`    ...`)
      members.slice(-5).forEach((m) => {
        console.log(`    ${m.nra} | ${m.nama_lengkap}`)
      })

      allMembers.push(...members)
    } catch (err) {
      console.error(`  Error: ${err.message}`)
    }
  }

  // Deduplicate by NRA
  const uniqueMap = new Map()
  allMembers.forEach((m) => {
    if (!uniqueMap.has(m.nra)) {
      uniqueMap.set(m.nra, m)
    }
  })
  const unique = Array.from(uniqueMap.values())

  console.log(`\n========================================`)
  console.log(`Total unique members: ${unique.length}`)
  console.log(`========================================`)

  // Save to JSON
  const outPath = path.resolve('scratch/nra-data.json')
  fs.writeFileSync(outPath, JSON.stringify(unique, null, 2), 'utf8')
  console.log(`Data saved to: ${outPath}`)

  // Print all entries for verification
  console.log('\n--- ALL ENTRIES ---')
  unique.forEach((m, i) => {
    console.log(`${String(i + 1).padStart(3)}. NRA: ${m.nra} | ${m.nama_lengkap}`)
  })
}

main()

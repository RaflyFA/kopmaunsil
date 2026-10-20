import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const folders = ['DIKSARKOP 1', 'LPJS 2026', 'Temu Anggota 1', 'Temu Anggota 2']
const publicDir = path.resolve('public')

async function convertAll() {
  console.log('--- Memulai Konversi Foto ke WebP ---')

  for (const folder of folders) {
    const folderPath = path.join(publicDir, folder)
    if (!fs.existsSync(folderPath)) {
      console.warn(`Folder tidak ditemukan: ${folderPath}`)
      continue
    }

    const files = fs.readdirSync(folderPath)
    console.log(`\nMemproses folder "${folder}" (${files.length} file)...`)

    for (const file of files) {
      const ext = path.extname(file).toLowerCase()
      // Hanya proses format gambar sumber (.jpg, .jpeg, .heic) dan bukan .webp
      if (!['.jpg', '.jpeg', '.heic'].includes(ext)) {
        continue
      }

      const baseName = path.basename(file, path.extname(file))
      const inputPath = path.join(folderPath, file)
      const outputPath = path.join(folderPath, `${baseName}.webp`)

      try {
        const statsBefore = fs.statSync(inputPath)
        await sharp(inputPath)
          .rotate() // Auto-orient berdasarkan EXIF kamera
          .resize({ width: 1920, withoutEnlargement: true }) // Maksimal lebar 1920px (Full HD)
          .webp({ quality: 82, effort: 4 })
          .toFile(outputPath)

        const statsAfter = fs.statSync(outputPath)
        const savings = Math.round((1 - statsAfter.size / statsBefore.size) * 100)
        console.log(
          `✓ ${file} -> ${baseName}.webp (${(statsBefore.size / 1024 / 1024).toFixed(2)} MB -> ${(statsAfter.size / 1024).toFixed(1)} KB, hemat ${savings}%)`
        )
      } catch (err) {
        console.error(`✗ Gagal konversi ${file}:`, err.message)
      }
    }
  }

  console.log('\n--- Konversi Selesai! ---')
}

convertAll()

import os
from PIL import Image, ImageOps
import pillow_heif

pillow_heif.register_heif_opener()

folders = ['DIKSARKOP 1', 'LPJS 2026', 'Temu Anggota 1', 'Temu Anggota 2']
public_dir = os.path.abspath('public')

print("=== MEMULAI KONVERSI SELURUH FOTO KE WEBP ===")

for folder in folders:
    folder_path = os.path.join(public_dir, folder)
    if not os.path.exists(folder_path):
        print(f"Folder tidak ditemukan: {folder_path}")
        continue

    files = sorted(os.listdir(folder_path))
    print(f"\nProcessing '{folder}' ({len(files)} files)...")

    for fname in files:
        ext = os.path.splitext(fname)[1].lower()
        if ext not in ['.jpg', '.jpeg', '.heic']:
            continue

        base_name = os.path.splitext(fname)[0]
        in_path = os.path.join(folder_path, fname)
        out_path = os.path.join(folder_path, f"{base_name}.webp")

        # Skip jika sudah ada webp yang valid
        if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
            print(f"  [Skip sudah ada] {base_name}.webp")
            continue

        try:
            size_before = os.path.getsize(in_path)
            with Image.open(in_path) as img:
                # Auto rotate based on EXIF tag
                img = ImageOps.exif_transpose(img)

                # Resize if larger than 1920
                max_dim = 1920
                if img.width > max_dim or img.height > max_dim:
                    img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)

                # Convert to RGB if RGBA/P
                if img.mode in ('RGBA', 'LA'):
                    bg = Image.new('RGB', img.size, (255, 255, 255))
                    bg.paste(img, mask=img.split()[-1])
                    img = bg
                elif img.mode != 'RGB':
                    img = img.convert('RGB')

                img.save(out_path, 'WEBP', quality=82, method=6)

            size_after = os.path.getsize(out_path)
            saving = round((1 - size_after / size_before) * 100)
            print(f"  [OK] {fname} -> {base_name}.webp ({size_before/1024/1024:.2f} MB -> {size_after/1024:.1f} KB, hemat {saving}%)")
        except Exception as e:
            print(f"  [ERROR] Gagal {fname}: {e}")

print("\n=== SEMUA KONVERSI SELESAI ===")

import { PageHeader, PortalShell } from '@/components/portal-shell'
import { DokumentasiGallery } from '@/components/dokumentasi-gallery'

export const metadata = {
  title: 'Dokumentasi & Galeri Kegiatan | Portal KOPMA UNSIL',
  description: 'Arsip foto dokumentasi kegiatan pendidikan, musyawarah, dan momen kebersamaan anggota KOPMA UNSIL.',
}

export default function DokumentasiPage() {
  return (
    <PortalShell>
      <PageHeader
        eyebrow="Arsip Momen & Gerakan"
        title="Dokumentasi Event KOPMA"
        description="Rekam jejak kegiatan, pendidikan kader DIKSARKOP/DIKMENKOP, Rapat Anggota Tahunan (RAT), hingga Dies Natalis KOPMA Universitas Siliwangi. Klik pada foto untuk membuka galeri lengkap."
      />

      <DokumentasiGallery />
    </PortalShell>
  )
}

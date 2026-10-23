import { PageHeader, PortalShell } from '@/components/portal-shell'
import { AspirasiBoard } from '@/components/aspirasi-board'
import { Lightbulb, ShieldCheck, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Ruang Aspirasi & Ide Anggota | Portal KOPMA UNSIL',
  description: 'Sampaikan usulan pelatihan, ide kegiatan, atau masukan untuk KOPMA UNSIL secara terbuka atau anonim.',
}

export default function AspirasiPage() {
  return (
    <PortalShell>
      <PageHeader
        
        title="LAKMUS (Link Aspirasi KOPMA UNSIL)"
        description="Ruang bagi seluruh anggota KOPMA UNSIL untuk mengusulkan ide pelatihan baru, event seru, atau perbaikan fasilitas. Dukung usulan yang kamu sukai agar segera direalisasikan pengurus KOPMA UNSIL!"
      />

      

      <AspirasiBoard />
    </PortalShell>
  )
}

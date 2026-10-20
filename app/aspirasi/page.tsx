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
        eyebrow="Ruang Kolaborasi Anggota"
        title="Kotak Aspirasi & Voting Usulan"
        description="Ruang bagi seluruh anggota KOPMA UNSIL untuk mengusulkan ide pelatihan baru, event seru, atau perbaikan fasilitas. Dukung usulan yang kamu sukai agar segera direalisasikan PSDA!"
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3.5 rounded-2xl border border-[#0133C6]/15 bg-[#0133C6]/5 p-4 text-xs leading-5 text-slate-700">
          <ShieldCheck className="size-5 shrink-0 text-[#0133C6]" />
          <div>
            <strong className="block text-slate-900">Opsi Kirim Anonim Aman</strong>
            Kamu bebas memilih kirim dengan nama atau sepenuhnya anonim tanpa rasa ragu.
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-2xl border border-amber-500/20 bg-amber-50/50 p-4 text-xs leading-5 text-slate-700">
          <Sparkles className="size-5 shrink-0 text-amber-600" />
          <div>
            <strong className="block text-slate-900">Kurasi Berkala Bidang PSDA</strong>
            Usulan dengan upvote terbanyak akan dibahas dalam rapat pleno pengurus bulanan.
          </div>
        </div>
      </div>

      <AspirasiBoard />
    </PortalShell>
  )
}

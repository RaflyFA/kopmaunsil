'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Award, BookOpen, CheckCircle2, Clock3, Filter, RotateCcw, Search, Sparkles, X } from 'lucide-react'
import { modules } from '@/data/baperku'
import { PageHeader, PortalShell } from '@/components/portal-shell'
import { LearningProgressCard } from '@/components/progress-tracker'
import { getStoredData, STORAGE_KEYS } from '@/lib/storage'

import { getMemberBaperkuProgress } from '@/lib/baperku/actions'

export default function BaperkuPage() {
  const [query, setQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'uncompleted'>('all')
  const [completedList, setCompletedList] = useState<string[]>([])
  const [quizScores, setQuizScores] = useState<Record<string, { score: number; maxScore: number }>>({})

  useEffect(() => {
    let isMounted = true

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('kopma_completed_modules')
    }

    async function syncProgress() {
      try {
        const data = await getMemberBaperkuProgress()
        if (isMounted) {
          setCompletedList(data.completedModules)
          setQuizScores(data.quizScores)
        }
      } catch (err) {
        console.error('Failed to sync baperku progress:', err)
      }
    }
    syncProgress()

    const onProgressUpdated = () => syncProgress()
    window.addEventListener('kopma-baperku-updated', onProgressUpdated)
    return () => {
      isMounted = false
      window.removeEventListener('kopma-baperku-updated', onProgressUpdated)
    }
  }, [])

  const filtered = useMemo(() => {
    return modules.filter((m) => {
      const matchQuery =
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.description.toLowerCase().includes(query.toLowerCase())

      const isCompleted = completedList.includes(m.slug)
      let matchStatus = true
      if (filterStatus === 'completed') matchStatus = isCompleted
      if (filterStatus === 'uncompleted') matchStatus = !isCompleted

      return matchQuery && matchStatus
    })
  }, [query, filterStatus, completedList])

  return (
    <PortalShell>
      <PageHeader
        eyebrow="Silabus Pendidikan Anggota"
        title="BAPERKU (Modul Edukasi)"
        description="Buku Alur Petunjuk Edukasi dan Rapor KOPMA UNSIL. Pelajari materi dasar hingga menengah, uji pemahamanmu dengan kuis interaktif"
      />

      {/* Learning Progress Card Widget */}
      <div className="mt-8">
        <LearningProgressCard />
      </div>

      {/* Search and Status Filters */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            aria-label="Cari materi"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari modul (contoh: DIKSARKOP, Simpanan, SHU, Manajemen)..."
            className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-10 text-sm outline-none ring-[#0133C6]/20 placeholder:text-slate-400 focus:border-[#0133C6] focus:ring-4"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Status Filter Chips */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`min-h-10 rounded-xl px-3.5 text-xs font-semibold transition ${
              filterStatus === 'all'
                ? 'bg-[#0133C6] text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Semua Modul ({modules.length})
          </button>
          <button
            onClick={() => setFilterStatus('uncompleted')}
            className={`min-h-10 rounded-xl px-3.5 text-xs font-semibold transition ${
              filterStatus === 'uncompleted'
                ? 'bg-[#0133C6] text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Belum Tuntas ({modules.length - completedList.length})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`min-h-10 rounded-xl px-3.5 text-xs font-semibold transition ${
              filterStatus === 'completed'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Selesai ({completedList.length})
          </button>
        </div>
      </div>

      {/* All Modules Direct List */}
      <div className="mt-9">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold text-slate-900">Daftar Modul BAPERKU</h2>
            <span className="rounded-full bg-[#0133C6]/10 px-2.5 py-0.5 text-xs font-bold text-[#0133C6]">
              {filtered.length} Modul
            </span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((module) => {
            const isCompleted = completedList.includes(module.slug)
            const score = quizScores[module.slug]

            return (
              <Link
                href={`/baperku/${module.slug}`}
                key={module.slug}
                className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                  isCompleted
                    ? 'border-emerald-200/80 hover:border-emerald-400'
                    : 'border-slate-200 hover:border-[#0133C6]/40'
                }`}
              >
                <div className="flex gap-4">
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm ${
                      isCompleted ? 'bg-emerald-600' : 'bg-[#0133C6]'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="size-6" /> : <BookOpen className="size-6" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 group-hover:text-[#0133C6] transition">
                        {module.title}
                      </h3>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">
                      {module.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock3 className="size-3.5 text-slate-400" />
                    {module.readTime} menit baca
                  </span>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 font-bold text-emerald-600">
                      <CheckCircle2 className="size-3.5" />
                      {score ? `Kuis: ${score.score}/${score.maxScore}` : 'Selesai'}
                    </span>
                  ) : (
                    <span className="font-semibold text-[#0133C6] group-hover:underline">
                     
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
            <BookOpen className="mx-auto size-8 text-slate-300" />
            <p className="mt-3 text-sm font-semibold">Tidak ada modul yang cocok.</p>
            <button
              onClick={() => {
                setQuery('')
                setFilterStatus('all')
              }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#0133C6] hover:underline"
            >
              <RotateCcw className="size-3.5" /> Reset pencarian
            </button>
          </div>
        )}
    </PortalShell>
  )
}

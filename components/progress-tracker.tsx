'use client'

import { useEffect, useState } from 'react'
import { Award, BookCheck, CheckCircle2, Circle, Flame, Sparkles, TrendingUp } from 'lucide-react'
import { getStoredData, setStoredData, STORAGE_KEYS } from '@/lib/storage'
import { modules } from '@/data/baperku'

// 1. Reading Progress Bar at the top of the viewport
export function ReadingProgressBar() {
  const [completion, setCompletion] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight <= 0) return
      const currentScroll = window.scrollY
      setCompletion(Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1.5 bg-slate-100">
      <div
        className="h-full bg-gradient-to-r from-[#0133C6] via-[#0952B6] to-cyan-400 transition-all duration-150"
        style={{ width: `${completion}%` }}
      />
    </div>
  )
}

// 2. Button to toggle completion of a specific module
export function ModuleCompletionToggle({ slug, title }: { slug: string; title: string }) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    const checkStatus = () => {
      const list = getStoredData<string[]>(STORAGE_KEYS.COMPLETED_MODULES, [])
      setIsCompleted(list.includes(slug))
    }
    checkStatus()

    const onStorageChange = () => checkStatus()
    window.addEventListener('kopma-storage-updated', onStorageChange)
    return () => window.removeEventListener('kopma-storage-updated', onStorageChange)
  }, [slug])

  const toggle = () => {
    const list = getStoredData<string[]>(STORAGE_KEYS.COMPLETED_MODULES, [])
    let updated: string[]

    if (list.includes(slug)) {
      updated = list.filter((item) => item !== slug)
      setIsCompleted(false)
    } else {
      updated = [...list, slug]
      setIsCompleted(true)
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
    setStoredData(STORAGE_KEYS.COMPLETED_MODULES, updated)
  }

  return (
    <div className="relative my-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Status Pembelajaran</h4>
          <p className="text-xs text-slate-500">
            {isCompleted
              ? 'Materi ini sudah kamu pelajari. Bagus sekali!'
              : 'Sudah selesai membaca materi ini? Tandai agar progres belajarmu tercatat.'}
          </p>
        </div>

        <button
          onClick={toggle}
          className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all shadow-sm ${
            isCompleted
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'border border-[#0133C6] bg-white text-[#0133C6] hover:bg-[#0133C6]/5'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="size-4" /> Sudah Selesai Dibaca
            </>
          ) : (
            <>
              <Circle className="size-4" /> Tandai Selesai Dibaca
            </>
          )}
        </button>
      </div>

      
    </div>
  )
}

// 3. Overall Learning Progress Dashboard Card
export function LearningProgressCard() {
  const [completedList, setCompletedList] = useState<string[]>([])
  const total = modules.length

  useEffect(() => {
    const update = () => {
      const list = getStoredData<string[]>(STORAGE_KEYS.COMPLETED_MODULES, [])
      setCompletedList(list)
    }
    update()

    const onStorageChange = () => update()
    window.addEventListener('kopma-storage-updated', onStorageChange)
    return () => window.removeEventListener('kopma-storage-updated', onStorageChange)
  }, [])

  const count = completedList.length
  const percentage = Math.round((count / total) * 100)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#0133C6]/15 bg-gradient-to-br from-white via-blue-50/40 to-slate-50 p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-[#0133C6] text-white shadow-md shadow-[#0133C6]/20">
            <BookCheck className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">Rapor Belajar BAPERKU</h3>
              {percentage >= 100 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  <Award className="size-3" /> Lulus Semua!
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {count === 0
                ? 'Mulai baca materi untuk mengumpulkan poin dan mengasah pemahaman.'
                : `${count} dari ${total} materi telah kamu selesaikan.`}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-[#0133C6]">{percentage}%</span>
          <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">Progres</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#0133C6] to-cyan-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1 font-medium">
          
          {count > 0 ? `${count} modul tuntas` : 'Belum ada modul tuntas'}
        </span>
        <span className="flex items-center gap-1">
          <TrendingUp className="size-3.5 text-[#0133C6]" />
          Target: {total} Modul
        </span>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { Award, BookCheck, CheckCircle2, Circle, Flame, Sparkles, TrendingUp } from 'lucide-react'
import { getStoredData, setStoredData, STORAGE_KEYS } from '@/lib/storage'
import { getMemberBaperkuProgress, toggleModuleProgress } from '@/lib/baperku/actions'
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
  const [isLoading, setIsLoading] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    let isMounted = true

    // Bersihkan legacy dummy progress jika ada di browser
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('kopma_completed_modules')
    }

    async function fetchStatus() {
      try {
        const progress = await getMemberBaperkuProgress()
        if (isMounted) {
          setIsCompleted(progress.completedModules.includes(slug))
        }
      } catch (err) {
        console.error('Error fetching module completion:', err)
      }
    }
    fetchStatus()

    const onProgressUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setIsCompleted(customEvent.detail.includes(slug))
      } else {
        fetchStatus()
      }
    }

    window.addEventListener('kopma-baperku-updated', onProgressUpdated)
    return () => {
      isMounted = false
      window.removeEventListener('kopma-baperku-updated', onProgressUpdated)
    }
  }, [slug])

  const toggle = async () => {
    if (isLoading) return
    setIsLoading(true)

    // Optimistic toggle
    const nextStatus = !isCompleted
    setIsCompleted(nextStatus)
    if (nextStatus) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }

    try {
      const res = await toggleModuleProgress(slug)
      if (res.success && res.completedModules) {
        setIsCompleted(res.isCompleted ?? nextStatus)
        window.dispatchEvent(
          new CustomEvent('kopma-baperku-updated', { detail: res.completedModules })
        )
      } else if (res.error) {
        // Rollback jika gagal
        setIsCompleted(!nextStatus)
        alert(res.error)
      }
    } catch (err) {
      setIsCompleted(!nextStatus)
      console.error('Failed to toggle module:', err)
    } finally {
      setIsLoading(false)
    }
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
          disabled={isLoading}
          className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all shadow-sm ${
            isCompleted
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'border border-[#0133C6] bg-white text-[#0133C6] hover:bg-[#0133C6]/5'
          } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
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
export function LearningProgressCard({ initialCompletedList }: { initialCompletedList?: string[] }) {
  const [completedList, setCompletedList] = useState<string[]>(initialCompletedList || [])
  const [isLoaded, setIsLoaded] = useState(initialCompletedList !== undefined)
  const total = modules.length

  useEffect(() => {
    let isMounted = true

    // Bersihkan legacy dummy browser data
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('kopma_completed_modules')
    }

    async function loadRealProgress() {
      try {
        const progress = await getMemberBaperkuProgress()
        if (isMounted) {
          setCompletedList(progress.completedModules)
          setIsLoaded(true)
        }
      } catch (err) {
        console.error('Error loading member progress:', err)
        if (isMounted) setIsLoaded(true)
      }
    }

    loadRealProgress()

    const onProgressUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setCompletedList(customEvent.detail)
      } else {
        loadRealProgress()
      }
    }

    window.addEventListener('kopma-baperku-updated', onProgressUpdated)
    return () => {
      isMounted = false
      window.removeEventListener('kopma-baperku-updated', onProgressUpdated)
    }
  }, [])

  const count = completedList.length
  const percentage = Math.round((count / total) * 100)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#0133C6]/15 bg-gradient-to-br from-white via-blue-50/40 to-slate-50 p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          
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
              {!isLoaded
                ? 'Memuat data progres akun...'
                : count === 0
                ? 'Mulai baca materi untuk mengumpulkan poin dan mengasah pemahaman.'
                : `${count} dari ${total} materi telah kamu selesaikan.`}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-[#0133C6]">{isLoaded ? `${percentage}%` : '...'}</span>
          <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">Progres</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#0133C6] to-cyan-500 transition-all duration-500"
          style={{ width: `${isLoaded ? percentage : 0}%` }}
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

'use client'

import { useState, useEffect } from 'react'
import {
  Check,
  ChevronDown,
  FileText,
  Filter,
  Flame,
  GraduationCap,
  Heart,
  Layers,
  Lightbulb,
  MessageSquare,
  Plus,
  Send,
  Sparkles,
  Tag,
  User,
  UserCheck,
  X,
} from 'lucide-react'
import { Aspiration, AspirationCategory, initialAspirations } from '@/data/aspirasi'
import { getStoredData, setStoredData, STORAGE_KEYS } from '@/lib/storage'
import { createClient } from '@/lib/supabase/client'
import {
  getAspirationsAction,
  createAspirationAction,
  toggleAspirationUpvoteAction,
} from '@/lib/aspirasi/actions'

const categories: ('Semua' | AspirationCategory)[] = [
  'Semua',
  'Pelatihan & Skill',
  'Event & Gathering',
  'Usaha & Fasilitas',
  'Kritik & Saran',
]

export function AspirasiBoard() {
  const [aspirations, setAspirations] = useState<Aspiration[]>([])
  const [upvotedIds, setUpvotedIds] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<'Semua' | AspirationCategory>('Semua')
  const [sortBy, setSortBy] = useState<'popular' | 'latest'>('popular')
  const [showModal, setShowModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Form State
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<AspirationCategory>('Pelatihan & Skill')
  const [description, setDescription] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [authorName, setAuthorName] = useState('')
  const [faculty, setFaculty] = useState('Fakultas Ekonomi & Bisnis')

  // Load aspirations directly from Supabase
  useEffect(() => {
    let isMounted = true

    // Bersihkan legacy dummy browser data
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('kopma_aspirations')
      window.localStorage.removeItem('kopma_upvoted_aspirations')
    }

    async function loadAspirations() {
      try {
        const res = await getAspirationsAction()
        if (isMounted) {
          setAspirations(res.aspirations)
          setUpvotedIds(res.upvotedIds)
        }
      } catch (err) {
        console.error('Failed to load aspirations from database:', err)
      }
    }

    loadAspirations()

    // Pre-fill user profile if logged in
    async function loadUserProfile() {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          const { data: member } = await supabase
            .from('members')
            .select('nama_lengkap, nra')
            .eq('id', user.id)
            .maybeSingle()

          if (member?.nama_lengkap) {
            setAuthorName(member.nama_lengkap)
          }

          if (member?.nra) {
            const { data: wl } = await supabase
              .from('nra_whitelist')
              .select('prodi, fakultas')
              .eq('nra', member.nra)
              .maybeSingle()

            if (wl?.prodi) {
              setFaculty(`${wl.prodi}${wl.fakultas ? ` • ${wl.fakultas}` : ''}`)
            }
          }
        }
      } catch {}
    }

    loadUserProfile()

    return () => {
      isMounted = false
    }
  }, [])

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Handle upvoting with Supabase database
  const handleToggleUpvote = async (id: string) => {
    const isUpvoted = upvotedIds.includes(id)
    const prevUpvotedIds = [...upvotedIds]
    const prevAspirations = [...aspirations]

    // Optimistic UI update
    if (isUpvoted) {
      setUpvotedIds(upvotedIds.filter((item) => item !== id))
      setAspirations(
        aspirations.map((item) =>
          item.id === id ? { ...item, upvotes: Math.max(0, item.upvotes - 1) } : item
        )
      )
    } else {
      setUpvotedIds([...upvotedIds, id])
      setAspirations(
        aspirations.map((item) =>
          item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item
        )
      )
      triggerToast('Aspirasi berhasil kamu dukung! 👍')
    }

    try {
      const res = await toggleAspirationUpvoteAction(id)
      if (!res.success && res.error) {
        // Rollback
        setUpvotedIds(prevUpvotedIds)
        setAspirations(prevAspirations)
        triggerToast(res.error)
      } else if (res.upvotes !== undefined) {
        setAspirations((current) =>
          current.map((item) => (item.id === id ? { ...item, upvotes: res.upvotes! } : item))
        )
      }
    } catch (err) {
      setUpvotedIds(prevUpvotedIds)
      setAspirations(prevAspirations)
      console.error('Failed to toggle upvote:', err)
    }
  }

  // Handle submit new aspiration with Supabase database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return

    try {
      const res = await createAspirationAction({
        title: title.trim(),
        description: description.trim(),
        category,
        isAnonymous,
        authorName,
        faculty,
      })

      if (res.success && res.aspiration) {
        setAspirations([res.aspiration, ...aspirations])
        setUpvotedIds([...upvotedIds, res.aspiration.id])

        // Reset Form
        setTitle('')
        setDescription('')
        setShowModal(false)
        triggerToast('Aspirasi kamu berhasil dikirimkan ke database KOPMA UNSIL! 🎉')
      } else if (res.error) {
        triggerToast(res.error)
      }
    } catch (err) {
      console.error('Failed to create aspiration:', err)
      triggerToast('Terjadi kesalahan saat mengirim aspirasi.')
    }
  }

  // Filter & Sort
  const filtered = aspirations.filter((item) => {
    if (activeCategory === 'Semua') return true
    return item.category === activeCategory
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'popular') return b.upvotes - a.upvotes
    return 0 // Keep order
  })

  return (
    <div className="relative mt-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 transform rounded-2xl bg-slate-900/95 px-5 py-3 text-sm font-semibold text-white shadow-2xl backdrop-blur transition-all animate-in fade-in slide-in-from-bottom-3 md:bottom-8">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Suara & Aspirasi Anggota</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Dukung ide kegiatan favoritmu atau sampaikan aspirasimu langsung ke pengurus KOPMA UNSIL.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0133C6] px-5 text-sm font-bold text-white shadow-md shadow-[#0133C6]/20 transition-all hover:bg-[#0952B6] hover:shadow-lg"
        >
          <Plus className="size-4" />
          Kirim Usulan Baru
        </button>
      </div>

      {/* Filter and Sorting Row */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`min-h-10 shrink-0 rounded-full px-4 text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#0133C6] text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">Urutkan:</span>
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 text-xs font-semibold">
            <button
              onClick={() => setSortBy('popular')}
              className={`rounded-lg px-3 py-1.5 transition ${
                sortBy === 'popular' ? 'bg-[#0133C6]/10 text-[#0133C6]' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
            Terbanyak Didukung
            </button>
            <button
              onClick={() => setSortBy('latest')}
              className={`rounded-lg px-3 py-1.5 transition ${
                sortBy === 'latest' ? 'bg-[#0133C6]/10 text-[#0133C6]' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
            Terbaru
            </button>
          </div>
        </div>
      </div>

      {/* Aspirations Grid / Feed */}
      <div className="mt-6 space-y-4">
        {sorted.map((item) => {
          const isUpvoted = upvotedIds.includes(item.id)

          // Status Badge Color
          let badgeClass = 'bg-amber-50 text-amber-700 border-amber-200'
          if (item.status === 'Disetujui') badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200'
          if (item.status === 'Sedang Berjalan') badgeClass = 'bg-blue-50 text-blue-700 border-blue-200'
          if (item.status === 'Diagendakan') badgeClass = 'bg-purple-50 text-purple-700 border-purple-200'

          return (
            <article
              key={item.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-[#0133C6]/30 hover:shadow-md md:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  {/* Category & Status */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-bold text-slate-600">
                      {item.category}
                    </span>
                    <span className={`rounded-full border px-3 py-0.5 text-xs font-bold ${badgeClass}`}>
                      ● {item.status}
                    </span>
                    <span className="text-xs text-slate-400">· {item.createdAt}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 text-lg font-bold text-slate-900 transition group-hover:text-[#0133C6]">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>

                  {/* Author / Metadata */}
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <UserCheck className="size-3.5 text-slate-400" />
                      {item.authorName} ({item.authorRole})
                    </span>
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Admin Response Box (if available) */}
                  {item.adminResponse && (
                    <div className="mt-4 rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-3.5 text-xs text-slate-700">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                        <Sparkles className="size-3.5 text-emerald-600" />
                        Tanggapan Pengurus KOPMA:
                      </div>
                      <p className="mt-1 leading-5 text-emerald-950">{item.adminResponse}</p>
                    </div>
                  )}
                </div>

                {/* Upvote Button */}
                <div className="sm:self-center">
                  <button
                    onClick={() => handleToggleUpvote(item.id)}
                    className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-bold transition-all ${
                      isUpvoted
                        ? 'border-[#0133C6] bg-[#0133C6] text-white shadow-md shadow-[#0133C6]/25'
                        : 'border-slate-200 bg-slate-50/80 text-slate-700 hover:border-[#0133C6]/40 hover:bg-white'
                    }`}
                  >
                    <Heart className={`size-4 ${isUpvoted ? 'fill-white text-white' : 'text-slate-400'}`} />
                    <span>{item.upvotes}</span>
                    <span className="hidden sm:inline font-normal text-xs opacity-80">Dukung</span>
                  </button>
                </div>
              </div>
            </article>
          )
        })}

        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 p-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-[#0133C6]">
              <Lightbulb className="size-7" />
            </div>
            <h4 className="mt-4 text-base font-bold text-slate-800">
              {activeCategory === 'Semua' ? 'Belum Ada Aspirasi' : `Belum Ada Aspirasi di Kategori ${activeCategory}`}
            </h4>
            <p className="mt-1.5 max-w-sm text-xs text-slate-500 leading-relaxed">
              Jadilah yang pertama menyampaikan usulan ide program, kegiatan, atau masukan untuk KOPMA UNSIL.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0133C6] px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#0133C6]/20 transition hover:bg-[#0952B6]"
            >
              <Plus className="size-4" />
              <span>Sampaikan Aspirasi Pertama</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal Kirim Aspirasi */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl md:p-8 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#0133C6]/10 text-[#0133C6]">
                  <Lightbulb className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Sampaikan Aspirasi Baru</h3>
                  <p className="text-xs text-slate-500">Usulan kamu akan langsung ditinjau oleh pengurus KOPMA UNSIL.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
              {/* Category */}
              <label className="flex flex-col gap-1.5 text-xs font-normal text-slate-700">
                Kategori Usulan
                <div className="relative">
                  <Layers className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as AspirationCategory)}
                    className="min-h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-900 transition-all outline-none focus:border-[#0133C6] focus:ring-4 focus:ring-[#0133C6]/10 cursor-pointer"
                  >
                    <option value="Pelatihan & Skill">Pelatihan & Skill</option>
                    <option value="Event & Gathering">Event & Gathering</option>
                    <option value="Usaha & Fasilitas">Usaha & Fasilitas</option>
                    <option value="Kritik & Saran">Kritik & Saran</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                </div>
              </label>

              {/* Title */}
              <label className="flex flex-col gap-1.5 text-xs font-normal text-slate-700">
                Judul Ide / Usulan
                <div className="relative">
                  <Tag className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input
                    required
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Workshop Copywriting untuk Usaha Anggota"
                    className="min-h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 transition-all outline-none focus:border-[#0133C6] focus:ring-4 focus:ring-[#0133C6]/10 placeholder:text-slate-400"
                  />
                </div>
              </label>

              {/* Description */}
              <label className="flex flex-col gap-1.5 text-xs font-normal text-slate-700">
                Penjelasan & Harapan
                <div className="relative">
                  <FileText className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-slate-400" />
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ceritakan mengapa kegiatan ini bermanfaat bagi anggota dan apa saja yang ingin dipelajari..."
                    className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm text-slate-900 transition-all outline-none focus:border-[#0133C6] focus:ring-4 focus:ring-[#0133C6]/10 placeholder:text-slate-400 resize-none"
                  />
                </div>
              </label>

              {/* Anonymous Toggle Card */}
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 transition-all">
                <label className="flex cursor-pointer items-center justify-between text-xs font-normal text-slate-800">
                  <div>
                    <span className="font-semibold text-slate-900">Kirim Sebagai Suara Anonim</span>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {isAnonymous
                        ? 'Identitas dan NRA kamu disembunyikan'
                        : 'Nama dan fakultas kamu akan ditampilkan di kartu aspirasi.'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="size-4.5 rounded border-slate-300 text-[#0133C6] focus:ring-[#0133C6] cursor-pointer"
                  />
                </label>

                {!isAnonymous && (
                  <div className="mt-4 grid gap-3 pt-3 border-t border-slate-200/60 sm:grid-cols-2">
                    <label className="flex flex-col gap-1 text-xs font-normal text-slate-700">
                      Nama Pengirim
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                        <input
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          placeholder="Nama Lengkap"
                          className="min-h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-900 outline-none focus:border-[#0133C6] focus:ring-2 focus:ring-[#0133C6]/10"
                        />
                      </div>
                    </label>

                    <label className="flex flex-col gap-1 text-xs font-normal text-slate-700">
                      Program Studi / Fakultas
                      <div className="relative">
                        <GraduationCap className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                        <input
                          value={faculty}
                          onChange={(e) => setFaculty(e.target.value)}
                          placeholder="Fakultas / Prodi"
                          className="min-h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-900 outline-none focus:border-[#0133C6] focus:ring-2 focus:ring-[#0133C6]/10"
                        />
                      </div>
                    </label>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="mt-2 flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="min-h-12 rounded-xl px-5 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#0133C6] px-6 text-sm font-semibold text-white shadow-lg shadow-[#0133C6]/25 transition hover:bg-[#0952B6]"
                >
                  <Send className="size-4" />
                  <span>Kirimkan Aspirasi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


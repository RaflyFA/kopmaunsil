'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { LogOut, User, CreditCard, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react'
import { logoutAction } from '@/lib/auth/actions'
import { type CurrentMember, getInitials } from '@/lib/auth/types'
import { createClient } from '@/lib/supabase/client'

interface UserDropdownProps {
  initialMember?: CurrentMember | null
}

export function UserDropdown({ initialMember }: UserDropdownProps) {
  const [member, setMember] = useState<CurrentMember | null>(initialMember || null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch client-side if not supplied initially (e.g. on client pages)
  useEffect(() => {
    if (initialMember !== undefined) {
      setMember(initialMember)
      return
    }

    let isMounted = true
    async function loadClientMember() {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          if (isMounted) setMember(null)
          return
        }

        const { data: memberData } = await supabase
          .from('members')
          .select('id, nra, nama_lengkap, role, is_active, created_at')
          .eq('id', user.id)
          .maybeSingle()

        const rawName =
          memberData?.nama_lengkap ||
          user.user_metadata?.nama_lengkap ||
          user.email?.split('@')[0] ||
          'Anggota'
        const rawNra = memberData?.nra || user.user_metadata?.nra || ''

        let prodi = null
        let fakultas = null
        if (rawNra) {
          const { data: wl } = await supabase
            .from('nra_whitelist')
            .select('prodi, fakultas')
            .eq('nra', rawNra)
            .maybeSingle()
          if (wl) {
            prodi = wl.prodi
            fakultas = wl.fakultas
          }
        }

        if (isMounted) {
          setMember({
            id: user.id,
            nra: rawNra,
            nama_lengkap: rawName,
            role: memberData?.role || 'anggota',
            is_active: memberData?.is_active ?? true,
            created_at: memberData?.created_at || user.created_at,
            prodi,
            fakultas,
            initials: getInitials(rawName),
          })
        }
      } catch (err) {
        console.error('Failed to load member profile client-side:', err)
      }
    }

    loadClientMember()
    return () => {
      isMounted = false
    }
  }, [initialMember])

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('kopma_completed_modules')
        window.localStorage.removeItem('kopma_quiz_results')
        window.localStorage.removeItem('kopma_aspirations')
        window.localStorage.removeItem('kopma_upvoted_aspirations')
      }
      await logoutAction()
    } catch {
      setIsLoggingOut(false)
    }
  }

  const scrollToKta = () => {
    setIsOpen(false)
    const ktaEl = document.getElementById('kta-section')
    if (ktaEl) {
      ktaEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!member) {
    return (
      <Link
        href="/login"
        className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#0133C6] px-4 text-xs font-bold text-white shadow-md shadow-[#0133C6]/20 transition-all hover:bg-[#0952B6]"
      >
        <User className="size-3.5" />
        <span>Masuk</span>
      </Link>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-2.5 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0133C6]/30"
      >
        <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0133C6] to-[#0952B6] text-xs font-bold text-white shadow-sm ring-2 ring-blue-100">
          {member.initials}
        </div>
        <div className="hidden text-left sm:block">
          <p className="max-w-[120px] truncate text-xs font-bold leading-none text-slate-800">
            {member.nama_lengkap}
          </p>
          <p className="mt-0.5 text-[10px] font-medium text-slate-500 font-mono">
            {member.nra}
          </p>
        </div>
        <ChevronDown className={`size-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-72 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95">
          {/* Member Card Header */}
          <div className="rounded-xl bg-gradient-to-br from-blue-50/80 via-slate-50 to-blue-50/40 p-4 border border-blue-100/60">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0133C6] to-[#0952B6] text-sm font-black text-white shadow-md">
                {member.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-900 leading-tight">
                  {member.nama_lengkap}
                </p>
                <p className="mt-0.5 font-mono text-xs text-[#0133C6] font-semibold">
                  NRA: {member.nra}
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-slate-200/80 pt-2.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                <CheckCircle2 className="size-3" />
                {member.is_active ? 'Anggota Aktif' : 'Non-Aktif'}
              </span>
              {member.prodi && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100/70 px-2 py-0.5 text-[10px] font-medium text-blue-800 truncate max-w-[170px]">
                  {member.prodi}
                </span>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <div className="mt-2 space-y-1">
            <button
              type="button"
              onClick={scrollToKta}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              <CreditCard className="size-4 text-[#0133C6]" />
              <span>Lihat Kartu Anggota (KTA)</span>
            </button>

            <div className="my-1 border-t border-slate-100" />

            <form action={handleLogout}>
              <button
                type="submit"
                disabled={isLoggingOut}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition disabled:opacity-50"
              >
                <LogOut className="size-4" />
                <span>{isLoggingOut ? 'Sedang keluar...' : 'Keluar dari Akun'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

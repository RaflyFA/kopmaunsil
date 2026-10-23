'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  ChevronRight,
  FileText,
  Home,
  Lightbulb,
  Menu,
  Search,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserDropdown } from '@/components/user-dropdown'
import type { CurrentMember } from '@/lib/auth/types'

const navItems = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/baperku', label: 'BAPERKU', icon: BookOpen },
  { href: '/aspirasi', label: 'Aspirasi', icon: Lightbulb },
  { href: '/dokumentasi', label: 'Dokumentasi', icon: FileText },
]

export function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 transition hover:opacity-90">
      <div className="relative size-10 flex items-center justify-center">
        <Image
          src="/LOGO KOPMA.PNG"
          alt="Logo KOPMA UNSIL"
          width={40}
          height={40}
          className="object-contain"
          priority
        />
      </div>
      {!compact && (
        <div>
          <p className="text-sm font-bold leading-none text-slate-900">KOPMA UNSIL</p>
          <p className="mt-1 text-xs font-semibold text-[#0133C6]">Universitas Siliwangi</p>
        </div>
      )}
    </Link>
  )
}

export function TopNav({ member }: { member?: CurrentMember | null }) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 hidden border-b border-slate-200/80 bg-white/90 backdrop-blur-md md:block">
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
        <LogoMark />

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex min-h-11 items-center gap-2 rounded-xl px-3.5 text-xs font-bold transition-all',
                  pathname === href || (href !== '/' && pathname.startsWith(href))
                    ? 'bg-[#0133C6]/10 text-[#0133C6]'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-[#0952B6]'
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>

          <UserDropdown initialMember={member} />
        </div>
      </div>
    </header>
  )
}

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200/80 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around py-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex min-h-14 min-w-14 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-bold transition-colors',
                isActive ? 'text-[#0133C6]' : 'text-slate-500 hover:text-slate-900'
              )}
            >
              <div
                className={cn(
                  'flex size-9 items-center justify-center rounded-xl transition-all',
                  isActive ? 'bg-[#0133C6]/10 text-[#0133C6]' : ''
                )}
              >
                <Icon className="size-[22px] stroke-[2.2]" />
              </div>
              <span className="leading-tight">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export function PortalShell({
  children,
  member,
}: {
  children: React.ReactNode
  member?: CurrentMember | null
}) {
  return (
    <div className="min-h-screen bg-slate-50/40">
      <TopNav member={member} />
      <main className="mx-auto max-w-5xl px-4 pb-28 md:px-6 md:pb-12">{children}</main>
      <BottomNav />
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="pt-8 md:pt-10">
      <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0133C6]">
        <span className="h-0.5 w-6 rounded-full bg-[#0133C6]" />
        {eyebrow || 'KOPMA UNSIL'}
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{title}</h1>
      {description && <p className="mt-2.5 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>}
    </div>
  )
}

export function SectionTitle({
  title,
  href,
  label = 'Lihat semua',
}: {
  title: string
  href?: string
  label?: string
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      {href && (
        <Link href={href} className="flex items-center gap-1 text-xs font-bold text-[#0133C6] hover:underline">
          {label}
          <ChevronRight className="size-3.5" />
        </Link>
      )}
    </div>
  )
}

export function PlaceholderCover({ label = 'Dokumentasi KOPMA' }: { label?: string }) {
  return (
    <div className="flex aspect-[16/9] items-end bg-gradient-to-br from-[#0133C6] to-[#0952B6] p-4 text-white">
      <div className="max-w-[14rem] text-sm font-semibold leading-5">{label}</div>
    </div>
  )
}

export { BookOpen, FileText, Home, Lightbulb, Menu, Search, UserRound }

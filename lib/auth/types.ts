export interface CurrentMember {
  id: string
  nra: string
  nama_lengkap: string
  role: string
  is_active: boolean
  prodi?: string | null
  fakultas?: string | null
  created_at?: string | null
  initials: string
}

export function getInitials(name: string): string {
  if (!name) return 'A'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'A'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

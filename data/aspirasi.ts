export type AspirationCategory = 'Pelatihan & Skill' | 'Event & Gathering' | 'Usaha & Fasilitas' | 'Kritik & Saran'

export type AspirationStatus = 'Sedang Ditinjau' | 'Disetujui' | 'Sedang Berjalan' | 'Diagendakan'

export type Aspiration = {
  id: string
  title: string
  description: string
  category: AspirationCategory
  authorName: string
  authorRole: string
  createdAt: string
  upvotes: number
  status: AspirationStatus
  tags: string[]
  adminResponse?: string
}

export const initialAspirations: Aspiration[] = []


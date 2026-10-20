'use client'

// Helper for safe client-side localStorage handling in Next.js
export function getStoredData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : defaultValue
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error)
    return defaultValue
  }
}

export function setStoredData<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    // Dispatch a custom event so other components on the same page can re-sync
    window.dispatchEvent(new CustomEvent('kopma-storage-updated', { detail: { key, value } }))
  } catch (error) {
    console.warn(`Error writing localStorage key "${key}":`, error)
  }
}

export const STORAGE_KEYS = {
  COMPLETED_MODULES: 'kopma_completed_modules',
  QUIZ_RESULTS: 'kopma_quiz_results',
  ASPIRATIONS: 'kopma_aspirations',
  UPVOTED_ASPIRATIONS: 'kopma_upvoted_aspirations',
  LIKED_EVENTS: 'kopma_liked_events',
  MEMBER_PROFILE: 'kopma_member_profile',
} as const

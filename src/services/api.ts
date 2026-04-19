/**
 * API Service Layer for Envoy 1131
 * Provides a clean abstraction for data operations.
 * Currently uses localStorage; ready to swap in a real backend (Supabase, Firebase, etc.)
 */

export interface ManifestationStar {
  id: number
  intention: string
  x: number
  y: number
  size: number
  delay: number
  hue: number
  createdAt?: string
}

export interface SynchronicityEntry {
  id: number
  author: string
  text: string
  time: string
  likes: number
}

const MANIFESTATION_KEY = 'envoy1131_manifestations'
const SYNCHRONICITY_KEY = 'envoy1131_synchronicity'

export function createStar(intention: string, id: number): ManifestationStar {
  return {
    id,
    intention,
    x: 8 + Math.random() * 84,
    y: 8 + Math.random() * 84,
    size: 3 + Math.random() * 5,
    delay: Math.random() * 4,
    hue: 190 + Math.random() * 60,
    createdAt: new Date().toISOString(),
  }
}

export async function fetchManifestations(): Promise<ManifestationStar[]> {
  try {
    const stored = localStorage.getItem(MANIFESTATION_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  return []
}

export async function saveManifestations(stars: ManifestationStar[]): Promise<void> {
  try {
    localStorage.setItem(MANIFESTATION_KEY, JSON.stringify(stars))
  } catch { /* ignore */ }
}

export async function addManifestation(intention: string): Promise<ManifestationStar> {
  const star = createStar(intention, Date.now())
  const existing = await fetchManifestations()
  existing.push(star)
  await saveManifestations(existing)
  return star
}

export async function fetchSynchronicityEntries(): Promise<SynchronicityEntry[]> {
  try {
    const stored = localStorage.getItem(SYNCHRONICITY_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  return []
}

export async function saveSynchronicityEntries(entries: SynchronicityEntry[]): Promise<void> {
  try {
    localStorage.setItem(SYNCHRONICITY_KEY, JSON.stringify(entries))
  } catch { /* ignore */ }
}

export async function likeSynchronicityEntry(id: number): Promise<void> {
  const entries = await fetchSynchronicityEntries()
  const updated = entries.map((e) => (e.id === id ? { ...e, likes: e.likes + 1 } : e))
  await saveSynchronicityEntries(updated)
}

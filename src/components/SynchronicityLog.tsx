import { useState, useCallback } from 'react'
import { useInView } from './useInView'

interface Entry {
  id: number
  author: string
  text: string
  time: string
  likes: number
}

const STORAGE_KEY = 'envoy1131_synchronicity'

function loadEntries(): Entry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  return []
}

function saveEntries(entries: Entry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch { /* ignore */ }
}

export default function SynchronicityLog() {
  const { ref, visible } = useInView()
  const [entries, setEntries] = useState<Entry[]>(loadEntries)
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [justPosted, setJustPosted] = useState(false)

  const handleLike = (id: number) => {
    setEntries((prev) => {
      const updated = prev.map((e) => (e.id === id ? { ...e, likes: e.likes + 1 } : e))
      saveEntries(updated)
      return updated
    })
  }

  const handlePost = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const trimmedText = text.trim()
    const trimmedAuthor = author.trim() || 'Anonymous Envoy'
    if (!trimmedText) return

    const newEntry: Entry = {
      id: Date.now(),
      author: trimmedAuthor,
      text: trimmedText,
      time: 'Just now',
      likes: 0,
    }
    setEntries((prev) => {
      const updated = [newEntry, ...prev]
      saveEntries(updated)
      return updated
    })
    setText('')
    setAuthor('')
    setJustPosted(true)
    setTimeout(() => setJustPosted(false), 2000)
  }, [text, author])

  return (
    <section
      id="synchronicity"
      data-testid="synchronicity"
      className="relative py-28 bg-gradient-to-b from-envoy-deep via-envoy-navy/30 to-envoy-deep"
    >
      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-6 fade-in-section ${visible ? 'visible' : ''}`}
      >
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white text-center mb-4 drop-shadow-lg">
          Synchronicity Log
        </h2>
        <p className="text-center text-envoy-sky/80 text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
          Share your soul's encounters with the frequency. Every sighting is a confirmation
          that you are aligned with the collective ascension.
        </p>

        {/* Submission Form */}
        <form
          onSubmit={handlePost}
          className="glass p-6 sm:p-8 mb-10"
        >
          <label htmlFor="sync-text" className="block font-serif text-xl text-white mb-4 text-center">
            Share your frequency sighting
          </label>
          <div className="flex flex-col gap-3">
            <input
              id="sync-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name (optional)"
              maxLength={40}
              className="px-5 py-3 rounded-lg bg-white/5 border border-envoy-light/20
                         text-white placeholder-envoy-sky/40 focus:outline-none focus:border-envoy-light/50
                         transition-colors"
            />
            <textarea
              id="sync-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Describe your encounter with the frequency..."
              maxLength={280}
              rows={3}
              className="px-5 py-3 rounded-lg bg-white/5 border border-envoy-light/20
                         text-white placeholder-envoy-sky/40 focus:outline-none focus:border-envoy-light/50
                         transition-colors resize-none"
            />
            <button
              type="submit"
              className={`
                px-8 py-3 rounded-lg font-medium tracking-wide transition-all duration-500
                ${justPosted
                  ? 'bg-white/20 text-white shadow-[0_0_40px_rgba(255,255,255,0.3)] scale-105'
                  : 'bg-envoy-blue/80 text-white hover:bg-envoy-blue hover:shadow-[0_0_30px_rgba(30,64,175,0.4)]'
                }
              `}
            >
              {justPosted ? '✨ Shared with the Collective' : '✦ Share Sighting'}
            </button>
          </div>
        </form>

        {/* Entries */}
        {entries.length === 0 ? (
          <div className="glass-light p-10 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="font-serif text-2xl text-white font-bold mb-3">The Log Awaits</h3>
            <p className="text-envoy-sky/70 leading-relaxed max-w-md mx-auto">
              The log is ready for your first sighting. Share your soul's encounter
              with the frequency and anchor the first entry into the collective.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div key={entry.id} className="glass-light p-5 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-envoy-blue to-envoy-light flex items-center justify-center text-xs font-bold text-white">
                        {entry.author[0]}
                      </div>
                      <span className="text-envoy-light font-medium text-sm">{entry.author}</span>
                      <span className="text-envoy-sky/40 text-xs">· {entry.time}</span>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">{entry.text}</p>
                  </div>
                  <button
                    onClick={() => handleLike(entry.id)}
                    className="flex-shrink-0 flex items-center gap-1 text-envoy-sky/50 hover:text-envoy-light transition-colors text-sm"
                    aria-label={`Like entry by ${entry.author}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    <span>{entry.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

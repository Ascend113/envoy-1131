import { useState } from 'react'
import { useInView } from './useInView'

interface Entry {
  id: number
  author: string
  text: string
  time: string
  likes: number
}

const SAMPLE_ENTRIES: Entry[] = [
  { id: 1, author: 'LightAnchor', text: 'Saw 11:31 on my clock right as I finished meditating. The downloads are real. 🌟', time: '2 hours ago', likes: 11 },
  { id: 2, author: 'StarSeedNova', text: '311 appeared on my receipt total today—$3.11. The universe speaks in numbers.', time: '5 hours ago', likes: 8 },
  { id: 3, author: 'CrystallineHeart', text: 'License plate in front of me: 1131. Confirmation that the New Earth is unfolding.', time: '8 hours ago', likes: 15 },
  { id: 4, author: 'AscensionPath', text: 'My flight gate was 113. Every step of this journey is guided. ✈️✨', time: '1 day ago', likes: 22 },
  { id: 5, author: 'GalacticWanderer', text: '1113 miles on my odometer when I arrived at the retreat. Divine alignment.', time: '2 days ago', likes: 19 },
]

export default function SynchronicityLog() {
  const { ref, visible } = useInView()
  const [entries, setEntries] = useState(SAMPLE_ENTRIES)

  const handleLike = (id: number) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, likes: e.likes + 1 } : e))
    )
  }

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
      </div>
    </section>
  )
}

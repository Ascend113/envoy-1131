import { useState, useEffect, useCallback, useRef } from 'react'
import { useInView } from './useInView'

interface Star {
  id: number
  intention: string
  x: number
  y: number
  size: number
  delay: number
  hue: number
}

const SAMPLE_INTENTIONS: Omit<Star, 'id' | 'x' | 'y' | 'size' | 'delay' | 'hue'>[] = [
  { intention: 'Unity Consciousness for all' },
  { intention: 'Healing for the Planet' },
  { intention: 'Love and light for every soul ascending' },
  { intention: 'Peace across all dimensions' },
  { intention: 'Awakening for those ready to receive' },
]

const STORAGE_KEY = 'envoy1131_manifestations'

function createStar(intention: string, id: number): Star {
  return {
    id,
    intention,
    x: 8 + Math.random() * 84,
    y: 8 + Math.random() * 84,
    size: 3 + Math.random() * 5,
    delay: Math.random() * 4,
    hue: 190 + Math.random() * 60,
  }
}

function loadStars(): Star[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  return SAMPLE_INTENTIONS.map((s, i) => createStar(s.intention, i + 1))
}

function saveStars(stars: Star[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stars))
  } catch { /* ignore */ }
}

export default function ManifestationPortal() {
  const { ref, visible } = useInView()
  const [stars, setStars] = useState<Star[]>(loadStars)
  const [intention, setIntention] = useState('')
  const [hoveredStar, setHoveredStar] = useState<Star | null>(null)
  const [justManifested, setJustManifested] = useState(false)
  const [newestStarId, setNewestStarId] = useState<number | null>(null)
  const skyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    saveStars(stars)
  }, [stars])

  const handleManifest = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = intention.trim()
    if (!trimmed) return

    const newId = Date.now()
    const newStar = createStar(trimmed, newId)
    setStars((prev) => [...prev, newStar])
    setIntention('')
    setJustManifested(true)
    setNewestStarId(newId)
    setTimeout(() => setJustManifested(false), 1800)
    setTimeout(() => setNewestStarId(null), 3000)
  }, [intention])

  const skyLuminosity = Math.min(0.35, 0.08 + stars.length * 0.012)

  return (
    <section
      id="manifestation"
      data-testid="manifestation"
      className="relative py-28 bg-envoy-deep overflow-hidden"
    >
      {/* Background glow that intensifies with more stars */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(ellipse at center, rgba(147,197,253,${skyLuminosity}) 0%, transparent 65%)`,
        }}
      />

      <div
        ref={ref}
        className={`relative z-10 max-w-5xl mx-auto px-6 fade-in-section ${visible ? 'visible' : ''}`}
      >
        {/* Header */}
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white text-center mb-4 drop-shadow-lg">
          Manifestation Portal
        </h2>
        <p className="text-center text-envoy-sky/90 text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
          Set your intention to co-create the New Earth. Each intention becomes a star in our
          collective Ascension Sky, amplifying the frequency of love across all dimensions.
        </p>

        {/* Input Form */}
        <form
          onSubmit={handleManifest}
          className="glass p-6 sm:p-8 max-w-2xl mx-auto mb-14"
        >
          <label htmlFor="intention-input" className="block font-serif text-xl text-white mb-4 text-center">
            What do you wish to manifest for the New Earth?
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="intention-input"
              type="text"
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="Your intention..."
              maxLength={120}
              className="flex-1 px-5 py-3.5 rounded-lg bg-white/5 border border-envoy-light/20
                         text-white placeholder-envoy-sky/40 focus:outline-none focus:border-envoy-light/50
                         transition-colors"
            />
            <button
              type="submit"
              className={`
                px-8 py-3.5 rounded-lg font-medium tracking-wide
                transition-all duration-500 whitespace-nowrap
                ${justManifested
                  ? 'bg-white/20 text-white shadow-[0_0_40px_rgba(255,255,255,0.3),0_0_80px_rgba(147,197,253,0.2)] scale-105'
                  : 'bg-envoy-blue/80 text-white hover:bg-envoy-blue hover:shadow-[0_0_30px_rgba(30,64,175,0.4)]'
                }
              `}
            >
              {justManifested ? '✨ Manifested' : '✦ Manifest'}
            </button>
          </div>
        </form>

        {/* Ascension Sky */}
        <div className="text-center mb-6">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
            The Ascension Sky
          </h3>
          <p className="text-envoy-sky/60 text-sm mt-2">
            {`${stars.length} intention${stars.length !== 1 ? 's' : ''} anchoring light into the collective field`}
          </p>
        </div>

        <div
          ref={skyRef}
          className="relative w-full rounded-2xl overflow-hidden border border-envoy-light/10"
          style={{
            height: '420px',
            background: 'radial-gradient(ellipse at 30% 40%, rgba(15,32,68,0.9) 0%, rgba(10,22,40,1) 50%, rgba(5,10,25,1) 100%)',
          }}
        >
          {/* Distant nebula layers */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at 70% 30%, rgba(99,102,241,0.15) 0%, transparent 40%), radial-gradient(circle at 25% 70%, rgba(56,189,248,0.1) 0%, transparent 35%)',
            }}
          />

          {/* Subtle star-field dots */}
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`bg-star-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: `${1 + Math.random()}px`,
                height: `${1 + Math.random()}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.2 + Math.random() * 0.3,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite`,
              }}
            />
          ))}

          {/* Intention Stars */}
          {stars.map((star) => {
            const isNewest = star.id === newestStarId
            return (
              <div
                key={star.id}
                className="absolute group cursor-pointer"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
                onTouchStart={() => setHoveredStar(star)}
                onTouchEnd={() => setHoveredStar(null)}
              >
                {/* Outer glow */}
                <div
                  className="absolute rounded-full transition-all duration-700"
                  style={{
                    width: `${star.size * 5}px`,
                    height: `${star.size * 5}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, hsla(${star.hue},80%,70%,0.2) 0%, transparent 70%)`,
                    animation: isNewest ? 'starBirth 1.5s ease-out' : undefined,
                  }}
                />
                {/* Core star */}
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    background: `radial-gradient(circle, hsla(${star.hue},90%,85%,1) 0%, hsla(${star.hue},80%,60%,0.8) 60%, transparent 100%)`,
                    boxShadow: `0 0 ${star.size * 2}px hsla(${star.hue},80%,70%,0.5), 0 0 ${star.size * 4}px hsla(${star.hue},70%,60%,0.2)`,
                    animation: `twinkle ${2 + star.delay}s ease-in-out ${star.delay}s infinite${isNewest ? ', starBirth 1.5s ease-out' : ''}`,
                  }}
                />

                {/* Tooltip */}
                {hoveredStar?.id === star.id && (
                  <div
                    className="absolute z-50 px-4 py-2.5 rounded-lg glass text-sm text-white whitespace-nowrap
                               pointer-events-none"
                    style={{
                      bottom: `${star.size + 16}px`,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      maxWidth: '260px',
                      whiteSpace: 'normal',
                      boxShadow: `0 0 20px hsla(${star.hue},70%,60%,0.2)`,
                    }}
                  >
                    <div className="text-envoy-sky/60 text-xs mb-1 tracking-wider uppercase">Intention</div>
                    <div className="leading-snug">{star.intention}</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

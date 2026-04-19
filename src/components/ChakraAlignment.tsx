import { useInView } from './useInView'

interface Chakra {
  name: string
  sanskrit: string
  color: string
  glowColor: string
  desc: string
}

const CHAKRAS: Chakra[] = [
  { name: 'Crown', sanskrit: 'Sahasrara', color: '#A855F7', glowColor: 'rgba(168,85,247,0.6)', desc: 'Divine connection · Unity consciousness' },
  { name: 'Third Eye', sanskrit: 'Ajna', color: '#6366F1', glowColor: 'rgba(99,102,241,0.6)', desc: 'Intuition · Inner vision · Clarity' },
  { name: 'Throat', sanskrit: 'Vishuddha', color: '#38BDF8', glowColor: 'rgba(56,189,248,0.6)', desc: 'Truth · Expression · Communication' },
  { name: 'Heart', sanskrit: 'Anahata', color: '#34D399', glowColor: 'rgba(52,211,153,0.6)', desc: 'Love · Compassion · Healing' },
  { name: 'Solar Plexus', sanskrit: 'Manipura', color: '#FBBF24', glowColor: 'rgba(251,191,36,0.6)', desc: 'Power · Confidence · Will' },
  { name: 'Sacral', sanskrit: 'Svadhisthana', color: '#F97316', glowColor: 'rgba(249,115,22,0.6)', desc: 'Creativity · Passion · Flow' },
  { name: 'Root', sanskrit: 'Muladhara', color: '#EF4444', glowColor: 'rgba(239,68,68,0.6)', desc: 'Grounding · Stability · Security' },
]

function ChakraSVG({ color, glowColor }: { color: string; glowColor: string }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="chakra-icon" style={{ color }}>
      <defs>
        <filter id={`glow-${color.replace('#','')}`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={`grad-${color.replace('#','')}`}>
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="70%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Outer glow ring */}
      <circle cx="28" cy="28" r="26" fill="none" stroke={glowColor} strokeWidth="1" opacity="0.4" />
      {/* Lotus petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45) * Math.PI / 180
        const x1 = 28 + Math.cos(angle) * 10
        const y1 = 28 + Math.sin(angle) * 10
        const x2 = 28 + Math.cos(angle) * 22
        const y2 = 28 + Math.sin(angle) * 22
        const cx1 = 28 + Math.cos(angle + 0.4) * 18
        const cy1 = 28 + Math.sin(angle + 0.4) * 18
        const cx2 = 28 + Math.cos(angle - 0.4) * 18
        const cy2 = 28 + Math.sin(angle - 0.4) * 18
        return (
          <path
            key={i}
            d={`M${x1},${y1} C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.8"
            filter={`url(#glow-${color.replace('#','')})`}
          />
        )
      })}
      {/* Center gem */}
      <circle cx="28" cy="28" r="6" fill={`url(#grad-${color.replace('#','')})`} />
      <circle cx="28" cy="28" r="3" fill={color} opacity="0.9" />
    </svg>
  )
}

export default function ChakraAlignment() {
  const { ref, visible } = useInView()

  return (
    <section
      id="chakras"
      data-testid="chakras"
      className="relative py-28 bg-gradient-to-b from-envoy-deep via-envoy-navy/50 to-envoy-deep"
    >
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-6 fade-in-section ${visible ? 'visible' : ''}`}
      >
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white text-center mb-6 drop-shadow-lg">
          7 Chakra Alignment
        </h2>
        <p className="text-center text-envoy-sky/90 text-lg max-w-3xl mx-auto mb-4 leading-relaxed">
          Chakra alignment helps support one's heart, body, and soul on their ascension
          journey. When all seven chakras resonate in harmony, your body becomes more
          crystalline and you become a clearer channel for the Galactic Envoys forthcoming.
        </p>
        <p className="text-center text-envoy-light/70 text-base max-w-2xl mx-auto mb-14">
          When the heart, body, soul, and chakras are aligned, the more light your human body can receive.
        </p>

        {/* Vertical chakra column */}
        <div className="relative">
          {/* Central energy line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/40 via-green-400/40 to-red-500/40 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-4">
            {CHAKRAS.map((chakra, i) => (
              <div
                key={chakra.name}
                className="glass-light p-5 flex items-center gap-5 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className="flex-shrink-0">
                  <ChakraSVG color={chakra.color} glowColor={chakra.glowColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3 className="font-serif text-xl font-bold text-white">{chakra.name}</h3>
                    <span className="text-xs tracking-widest uppercase" style={{ color: chakra.color }}>
                      {chakra.sanskrit}
                    </span>
                  </div>
                  <p className="text-envoy-sky/70 text-sm mt-1">{chakra.desc}</p>
                </div>
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 hidden sm:block"
                  style={{
                    backgroundColor: chakra.color,
                    boxShadow: `0 0 12px ${chakra.glowColor}`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

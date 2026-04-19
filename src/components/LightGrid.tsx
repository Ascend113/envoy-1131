import { useState } from 'react'
import { useInView } from './useInView'

interface Beacon {
  id: number
  city: string
  x: number
  y: number
  intention: string
}

const BEACONS: Beacon[] = [
  { id: 1, city: 'New York', x: 28, y: 35, intention: 'Anchoring light in the collective' },
  { id: 2, city: 'London', x: 48, y: 28, intention: 'Unity consciousness for all' },
  { id: 3, city: 'Tokyo', x: 82, y: 34, intention: 'Harmony between all dimensions' },
  { id: 4, city: 'Sydney', x: 85, y: 68, intention: 'Grounding the New Earth frequency' },
  { id: 5, city: 'São Paulo', x: 32, y: 60, intention: 'Love vibrations for healing' },
  { id: 6, city: 'Cairo', x: 55, y: 38, intention: 'Ancient light reactivated' },
  { id: 7, city: 'Mumbai', x: 67, y: 42, intention: 'Soul awakening for billions' },
  { id: 8, city: 'Vancouver', x: 15, y: 30, intention: 'Nature and spirit unified' },
  { id: 9, city: 'Johannesburg', x: 54, y: 62, intention: 'Ubuntu — I am because we are' },
  { id: 10, city: 'Reykjavik', x: 42, y: 18, intention: 'Northern light downloads' },
  { id: 11, city: 'Sedona', x: 18, y: 36, intention: 'Vortex energy amplification' },
  { id: 12, city: 'Bali', x: 78, y: 53, intention: 'Sacred temple alignment' },
]

export default function LightGrid() {
  const { ref, visible } = useInView()
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      id="lightgrid"
      data-testid="lightgrid"
      className="relative py-28 bg-envoy-deep"
    >
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 fade-in-section ${visible ? 'visible' : ''}`}
      >
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white text-center mb-4 drop-shadow-lg">
          The Global Light Grid
        </h2>
        <p className="text-center text-envoy-sky/80 text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
          Envoys across the planet are anchoring light, love, and soul energy
          into the crystalline grid. Every beacon is a lighthouse of 5D consciousness.
        </p>

        <div className="glass-light p-6 sm:p-10">
          <div className="relative w-full" style={{ paddingBottom: '50%' }}>
            {/* Simple world outline */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 75"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Grid lines */}
              {Array.from({ length: 7 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 12.5} x2="100" y2={i * 12.5} stroke="rgba(147,197,253,0.06)" strokeWidth="0.2" />
              ))}
              {Array.from({ length: 11 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="75" stroke="rgba(147,197,253,0.06)" strokeWidth="0.2" />
              ))}

              {/* Connection lines */}
              {BEACONS.map((b, i) =>
                BEACONS.slice(i + 1).filter((_, j) => (i + j) % 3 === 0).map((b2) => (
                  <line
                    key={`${b.id}-${b2.id}`}
                    x1={b.x} y1={b.y} x2={b2.x} y2={b2.y}
                    stroke="rgba(147,197,253,0.08)"
                    strokeWidth="0.15"
                  />
                ))
              )}

              {/* Beacon dots */}
              {BEACONS.map((b) => (
                <g key={b.id}>
                  {/* Pulse ring */}
                  <circle cx={b.x} cy={b.y} r="2.5" fill="none" stroke="rgba(147,197,253,0.3)" strokeWidth="0.2">
                    <animate attributeName="r" from="1" to="4" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle
                    cx={b.x}
                    cy={b.y}
                    r="1"
                    fill={active === b.id ? '#93c5fd' : '#60a5fa'}
                    className="cursor-pointer"
                    onMouseEnter={() => setActive(b.id)}
                    onMouseLeave={() => setActive(null)}
                    style={{ filter: active === b.id ? 'drop-shadow(0 0 4px rgba(147,197,253,0.8))' : undefined }}
                  />
                </g>
              ))}
            </svg>

            {/* Tooltip */}
            {active && (() => {
              const b = BEACONS.find((b) => b.id === active)
              if (!b) return null
              return (
                <div
                  className="absolute glass px-3 py-2 text-xs text-white pointer-events-none z-20 min-w-[140px]"
                  style={{ left: `${b.x}%`, top: `${b.y - 8}%`, transform: 'translate(-50%, -100%)' }}
                >
                  <div className="font-bold text-envoy-light">{b.city}</div>
                  <div className="text-envoy-sky/70 mt-0.5">{b.intention}</div>
                </div>
              )
            })()}
          </div>
        </div>

        <p className="text-center text-envoy-sky/50 text-sm mt-6">
          {BEACONS.length} lighthouses anchoring the frequency globally
        </p>
      </div>
    </section>
  )
}

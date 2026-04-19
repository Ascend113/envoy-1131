import { useState, useRef, useCallback } from 'react'
import { useInView } from './useInView'

const GALACTIC_BG = 'https://static.prod-images.emergentagent.com/jobs/c46b2911-5e1b-4faa-b3f4-9ad3abbde6f2/images/45b2561c8a408f2ad84d2df6e88c4d5eef7269b5288b7d8626f585190e33028a.jpeg'

interface FreqCard {
  hz: number
  label: string
  desc: string
}

const FREQ_CARDS: FreqCard[] = [
  { hz: 113, label: '113 Hz', desc: 'Grounding · Spiritual Awakening' },
  { hz: 311, label: '311 Hz', desc: 'Abundance · Creative Expansion' },
  { hz: 1113, label: '1113 Hz', desc: 'Ascended Masters · Soul Purpose' },
  { hz: 1131, label: '1131 Hz', desc: 'Unity Consciousness · New Earth' },
]

export default function Frequency() {
  const { ref, visible } = useInView()
  const [playing, setPlaying] = useState<number | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const stopAudio = useCallback(() => {
    if (gainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime
      gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, now)
      gainRef.current.gain.linearRampToValueAtTime(0, now + 0.3)
      setTimeout(() => {
        oscRef.current?.stop()
        oscRef.current = null
        gainRef.current = null
      }, 350)
    }
    setPlaying(null)
  }, [])

  const playFrequency = useCallback((hz: number) => {
    if (playing === hz) {
      stopAudio()
      return
    }
    if (playing !== null) {
      oscRef.current?.stop()
      oscRef.current = null
      gainRef.current = null
    }

    const ctx = audioCtxRef.current || new AudioContext()
    audioCtxRef.current = ctx

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(hz, ctx.currentTime)
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.5)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    oscRef.current = osc
    gainRef.current = gain
    setPlaying(hz)
  }, [playing, stopAudio])

  return (
    <section
      id="frequency"
      data-testid="frequency"
      className="relative py-28 overflow-hidden"
    >
      {/* Clean galactic background — no text or lettering */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${GALACTIC_BG})` }}
      />
      <div className="absolute inset-0 bg-envoy-deep/75" />

      <div
        ref={ref}
        className={`relative z-10 max-w-6xl mx-auto px-6 fade-in-section ${visible ? 'visible' : ''}`}
      >
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white text-center mb-6 drop-shadow-lg">
          Galactic Envoy Frequency
        </h2>
        <p className="text-center text-envoy-sky/90 text-lg sm:text-xl max-w-3xl mx-auto mb-4 leading-relaxed">
          Our envoy attunes to frequencies that bridge dimensions. We are multidimensional
          light beings, inclusive of ascending light-workers and star-seeds. Our earth bodies
          emanate light, our hearts vibrates love. We are an earth based Envoy shining the
          brightest of light on our way to achieving unity consciousness and the new earth.
        </p>
        <p className="text-center text-envoy-light/80 text-base sm:text-lg max-w-2xl mx-auto mb-14">
          The heart of Envoy 1131 encompasses multidimensional frequencies, including the 1131 resonance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FREQ_CARDS.map((f) => {
            const isPlaying = playing === f.hz
            return (
              <div
                key={f.hz}
                className={`
                  glass-light p-6 text-center cursor-pointer transition-all duration-500
                  hover:scale-105
                  ${isPlaying ? 'shadow-[0_0_40px_rgba(147,197,253,0.4)] border-envoy-light/40' : ''}
                `}
                onClick={() => playFrequency(f.hz)}
                role="button"
                tabIndex={0}
                aria-label={`${isPlaying ? 'Stop' : 'Play'} ${f.label}`}
              >
                {/* Visualizer bars */}
                <div className="flex items-end justify-center gap-1 h-16 mb-4">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 rounded-full transition-all duration-300 ${
                        isPlaying ? 'bg-envoy-light' : 'bg-envoy-light/30'
                      }`}
                      style={{
                        height: isPlaying
                          ? `${30 + Math.sin((Date.now() / 200) + i * 0.9) * 25}px`
                          : `${10 + i * 4}px`,
                        animationDuration: isPlaying ? `${0.3 + i * 0.1}s` : undefined,
                      }}
                    />
                  ))}
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-1">{f.label}</h3>
                <p className="text-envoy-sky/70 text-sm">{f.desc}</p>
                <div className="mt-4">
                  <span className={`
                    inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wide
                    transition-all duration-300
                    ${isPlaying
                      ? 'bg-envoy-light/20 text-envoy-light border border-envoy-light/30'
                      : 'bg-white/5 text-envoy-sky/60 border border-white/10'
                    }
                  `}>
                    {isPlaying ? '■ Stop' : '▶ Listen'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

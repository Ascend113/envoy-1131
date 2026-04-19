import { useState, useEffect } from 'react'

const FREQUENCIES = [113, 311, 1113, 1131]

export default function FrequencyRotator() {
  const [index, setIndex] = useState(0)
  const [glowing, setGlowing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowing(true)
      setIndex((i) => (i + 1) % FREQUENCIES.length)
      setTimeout(() => setGlowing(false), 800)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      data-testid="frequency-rotator"
      className={`
        inline-flex items-center gap-2 px-4 py-1.5 rounded-full
        glass text-envoy-light font-mono text-sm tracking-widest
        transition-all duration-700
        ${glowing ? 'shadow-[0_0_30px_rgba(147,197,253,0.5)]' : 'shadow-[0_0_10px_rgba(147,197,253,0.2)]'}
      `}
    >
      <span className="inline-block w-2 h-2 rounded-full bg-envoy-light animate-pulse" />
      <span>{FREQUENCIES[index]}Hz</span>
    </div>
  )
}

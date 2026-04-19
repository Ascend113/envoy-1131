import { useState, useEffect } from 'react'

export default function LightFlash() {
  const [flashing, setFlashing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFlashing(true)
      setTimeout(() => setFlashing(false), 2500)
    }, 31000)
    return () => clearInterval(interval)
  }, [])

  if (!flashing) return null

  return (
    <div
      data-testid="light-flash"
      className="fixed inset-0 z-[999] pointer-events-none light-flash"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, rgba(191,219,254,0.25) 30%, rgba(147,197,253,0.08) 55%, transparent 75%)',
      }}
    />
  )
}

import { useState } from 'react'
import { useInView } from './useInView'

export default function JoinCTA() {
  const { ref, visible } = useInView()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <section
      id="join"
      data-testid="join"
      className="relative py-28 bg-envoy-deep"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,64,175,0.15)_0%,transparent_60%)]" />

      <div
        ref={ref}
        className={`relative z-10 max-w-2xl mx-auto px-6 text-center fade-in-section ${visible ? 'visible' : ''}`}
      >
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Join the Frequency
        </h2>
        <p className="text-envoy-sky/80 text-lg mb-10 leading-relaxed">
          Become part of the Envoy 1131 Lightworker Collective. Anchor your soul,
          heart, and consciousness into the New Earth.
        </p>

        {submitted ? (
          <div className="glass p-8 freq-glow">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="font-serif text-2xl text-white font-bold mb-2">Welcome, Envoy</h3>
            <p className="text-envoy-sky/80">
              Your light has been anchored into the collective. The frequency recognizes you.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass p-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-5 py-3.5 rounded-lg bg-white/5 border border-envoy-light/20
                         text-white placeholder-envoy-sky/40 focus:outline-none focus:border-envoy-light/50
                         transition-colors mb-4"
            />
            <button
              type="submit"
              className="w-full px-6 py-3.5 rounded-lg bg-envoy-blue/80 text-white font-medium
                         hover:bg-envoy-blue transition-colors duration-300 freq-glow"
            >
              Anchor My Light →
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

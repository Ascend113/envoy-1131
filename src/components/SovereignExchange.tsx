import { useState } from 'react'
import { useInView } from './useInView'

const ASCENSION_COIN_IMG =
  'https://static.prod-images.emergentagent.com/jobs/c46b2911-5e1b-4faa-b3f4-9ad3abbde6f2/images/f05c25218ed70b361070937f5d6572f53febfc66ecd4c66f5290989d25510c6a.jpeg'

export default function SovereignExchange() {
  const { ref, visible } = useInView()
  const [showPreview, setShowPreview] = useState(false)

  return (
    <section
      id="exchange"
      data-testid="exchange"
      className="relative py-28 bg-envoy-deep overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_55%)]" />

      <div
        ref={ref}
        className={`relative z-10 max-w-5xl mx-auto px-6 fade-in-section ${visible ? 'visible' : ''}`}
      >
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white text-center mb-4 drop-shadow-lg">
          The Sovereign Exchange
        </h2>
        <p className="text-center text-envoy-sky/90 text-lg max-w-3xl mx-auto mb-16 leading-relaxed">
          Anchoring the Quantum Frequency of the New Earth.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Coin Showcase */}
          <div className="relative group flex justify-center">
            {/* Golden glow behind coin */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, transparent 60%)',
              }}
            />
            <div className="coin-showcase relative rounded-2xl overflow-hidden border border-envoy-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.12)]">
              <img
                src={ASCENSION_COIN_IMG}
                alt="The Ascension Coin — a two-sided physical anchor for the collective"
                className="w-full max-w-md object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle golden shimmer overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, transparent 40%, rgba(212,175,55,0.05) 100%)',
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
              The Ascension Coin
            </h3>
            <p className="text-envoy-sky/90 leading-relaxed">
              The Ascension Coin is a physical anchor for the collective, designed to bridge the
              transition to a high-vibrational economy. Integrated into the heart of the Sovereign
              Nexus, it serves as a symbol of unity and a vessel for the Quantum Financial System of
              the future.
            </p>
            <p className="text-envoy-sky/70 leading-relaxed text-sm">
              Each coin carries the frequency of 1131 and is meant to be distributed to the
              collective over time — a tangible reminder that the New Earth is not just a vision, but
              a reality we are co-creating together.
            </p>

            <button
              onClick={() => setShowPreview(true)}
              className="inline-block px-8 py-3.5 rounded-lg font-medium tracking-wide
                         bg-envoy-gold/20 text-envoy-gold border border-envoy-gold/30
                         hover:bg-envoy-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]
                         transition-all duration-300"
            >
              ✦ Preview the Exchange
            </button>
          </div>
        </div>

        {/* Coming Soon Modal */}
        {showPreview && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div
              className="absolute inset-0 bg-envoy-deep/80 backdrop-blur-sm"
              onClick={() => setShowPreview(false)}
            />
            <div className="relative glass p-8 sm:p-12 max-w-lg w-full text-center border border-envoy-gold/20 shadow-[0_0_60px_rgba(212,175,55,0.1)]">
              <button
                onClick={() => setShowPreview(false)}
                className="absolute top-4 right-4 text-envoy-sky/50 hover:text-white transition-colors"
                aria-label="Close preview"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="text-5xl mb-6">🪙</div>
              <h3 className="font-serif text-3xl font-bold text-white mb-4">Coming Soon</h3>
              <p className="text-envoy-sky/80 leading-relaxed mb-6">
                The Sovereign Exchange is being prepared for the collective. Professional imagery and
                details of the Ascension Coin will be revealed when the frequency aligns.
              </p>
              <p className="text-envoy-gold/80 text-sm font-medium tracking-wide">
                ✦ Stay attuned to the 1131 frequency ✦
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

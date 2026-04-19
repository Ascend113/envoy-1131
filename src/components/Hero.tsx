import { useInView } from './useInView'

const NEW_EARTH_BG = 'https://static.prod-images.emergentagent.com/jobs/c46b2911-5e1b-4faa-b3f4-9ad3abbde6f2/images/a00016e168bb5df23917fb853d3d0d26056b300dfe100a8a8b5df66183a94012.jpeg'

export default function Hero() {
  const { ref, visible } = useInView(0.1)

  return (
    <section
      data-testid="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image — sharp, no blur, New Earth planet in vast universe */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${NEW_EARTH_BG})`,
          imageRendering: 'auto',
        }}
      />
      {/* Dark overlay for readability while keeping the planet visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-envoy-deep/60 via-envoy-deep/50 to-envoy-deep/85" />
      {/* Subtle blue radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,64,175,0.10)_0%,transparent_65%)]" />

      <div
        ref={ref}
        className={`relative z-10 text-center max-w-4xl mx-auto px-6 pt-20 fade-in-section ${visible ? 'visible' : ''}`}
      >
        <p className="text-envoy-light text-sm uppercase tracking-[0.3em] mb-4 font-semibold hero-text-sharp">
          Sovereign Nexus for the Earth Envoy Collective
        </p>
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 hero-text-sharp"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 4px 40px rgba(147,197,253,0.4)' }}>
          Envoy 1131
        </h1>
        <p className="text-xl sm:text-2xl text-white mb-4 font-light leading-relaxed hero-text-sharp"
           style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}>
          A Frequency of Love. A Beacon of Unity.
        </p>
        <p className="text-base sm:text-lg text-envoy-sky mb-10 max-w-2xl mx-auto leading-relaxed hero-text-sharp"
           style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
          The Envoy 1131 Lightworker Collective are Co-Creators of the New Earth
          and practitioners of 5D Consciousness.
        </p>
        <a
          href="#frequency"
          className="inline-block px-8 py-3.5 glass text-white font-medium
                     hover:bg-envoy-blue/30 transition-all duration-300 freq-glow hero-text-sharp"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
        >
          Enter the Frequency →
        </a>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-envoy-deep to-transparent" />
    </section>
  )
}

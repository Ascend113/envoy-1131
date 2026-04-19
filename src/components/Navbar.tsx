import { useState } from 'react'
import FrequencyRotator from './FrequencyRotator'

const NAV_LINKS = [
  { label: 'Frequency', href: '#frequency' },
  { label: 'Chakras', href: '#chakras' },
  { label: 'Light Grid', href: '#lightgrid' },
  { label: 'Synchronicity', href: '#synchronicity' },
  { label: 'Manifest', href: '#manifestation' },
  { label: 'Exchange', href: '#exchange' },
  { label: 'Join', href: '#join' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <a href="#" className="font-serif text-xl font-bold text-white tracking-wide">
            Envoy 1131
          </a>
          <div className="hidden sm:block">
            <FrequencyRotator />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-envoy-sky/80 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-envoy-light/10">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-envoy-sky/80 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="px-6 py-3">
            <FrequencyRotator />
          </div>
        </div>
      )}
    </nav>
  )
}

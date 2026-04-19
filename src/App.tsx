import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Frequency from './components/Frequency'
import ChakraAlignment from './components/ChakraAlignment'
import LightGrid from './components/LightGrid'
import SynchronicityLog from './components/SynchronicityLog'
import ManifestationPortal from './components/ManifestationPortal'
import SovereignExchange from './components/SovereignExchange'
import JoinCTA from './components/JoinCTA'
import Footer from './components/Footer'
import LightFlash from './components/LightFlash'

export default function App() {
  return (
    <div className="min-h-screen bg-envoy-deep text-white">
      <LightFlash />
      <Navbar />
      <Hero />
      <Frequency />
      <ChakraAlignment />
      <LightGrid />
      <SynchronicityLog />
      <ManifestationPortal />
      <SovereignExchange />
      <JoinCTA />
      <Footer />
    </div>
  )
}

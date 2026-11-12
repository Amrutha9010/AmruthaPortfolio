import { lazy, Suspense, useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { About, Education, Experience, Projects, Skills, Achievements } from './components/Sections'
import Contact from './components/Contact'
gsap.registerPlugin(ScrollTrigger)
const Scene = lazy(() => import('./components/Scene')) // 3D loads only after first paint

export default function App() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let lenis, raf
    if (!reduce) { // smooth scroll + GSAP sync
      lenis = new Lenis(); lenis.on('scroll', ScrollTrigger.update)
      const tick = t => { lenis.raf(t); raf = requestAnimationFrame(tick) }; raf = requestAnimationFrame(tick)
      gsap.to('.mesh', { yPercent: -15, ease: 'none', scrollTrigger: { scrub: true, start: 0, end: 'max' } }) // parallax
    }
    return () => { lenis?.destroy(); cancelAnimationFrame(raf) }
  }, [])
  return (<>
    <Loader onDone={() => setReady(true)} />
    <div className="mesh" /><Cursor /><Nav />
    <main>
      <Hero ready={ready} scene={<Suspense fallback={null}><Scene /></Suspense>} />
      <About /><Education /><Experience /><Projects /><Skills />{/* <Services /> */}<Achievements /><Contact />
    </main>
    <footer className="py-8 text-center text-sm text-white/50">© {new Date().getFullYear()} Amrutha Chappa</footer>
  </>)
}

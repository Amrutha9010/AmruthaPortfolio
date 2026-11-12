import { useRef, useState, useEffect } from 'react'
import { motion, animate, useInView, AnimatePresence } from 'framer-motion'
import { profile, counters, orbit, experience, education, projects, skills, services, achievements } from '../data'
import Magnetic from './Magnetic'

const fade = { hidden: { opacity: 0, y: 40 }, show: i => ({ opacity: 1, y: 0, transition: { delay: i * .1, duration: .6 } }) }
const Reveal = ({ i = 0, className = '', children }) =>
  <motion.div variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className={className}>{children}</motion.div>

// Heading with a masked slide-up text reveal
const Section = ({ id, title, children }) => (
  <section id={id} className="mx-auto max-w-6xl px-6 py-16">
    <div className="overflow-hidden"><motion.h2 initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
      transition={{ duration: .7 }} className="grad mb-8 text-4xl font-extrabold md:text-5xl">{title}</motion.h2></div>
    {children}
  </section>)

function Counter({ to, dec = 0, prefix = '', suffix = '' }) {
  const ref = useRef(), inView = useInView(ref, { once: true }), [v, setV] = useState(0)
  useEffect(() => { if (inView) animate(0, to, { duration: 1.8, onUpdate: setV }) }, [inView])
  return <span ref={ref}>{prefix}{v.toFixed(dec)}{suffix}</span>
}

export const About = () => (
  <Section id="about" title="About">
    <div className="grid items-center gap-12 md:grid-cols-2">
      <Reveal><p className="text-lg leading-relaxed text-white/80">{profile.about}</p>
        <div className="mt-8 grid grid-cols-2 gap-4">
          {counters.map(c => <div key={c.label} className="glass p-5">
            <div className="grad font-head text-3xl font-bold"><Counter {...c} /></div>
            <div className="text-sm text-white/60">{c.label}</div></div>)}
        </div></Reveal>
      {/* Lightweight CSS orbit (cheap on phones) */}
      <Reveal i={2} className="relative mx-auto h-72 w-72">
        <div className="glass absolute inset-[38%] grid place-items-center text-xs">Stack</div>
        <div className="absolute inset-0" style={{ animation: 'orbit 24s linear infinite' }}>
          {orbit.map((t, k) => { const a = (k / orbit.length) * 2 * Math.PI
            return <span key={t} className="glass absolute px-3 py-1 text-xs" style={{ left: `${45 + 45 * Math.cos(a)}%`, top: `${46 + 46 * Math.sin(a)}%` }}>{t}</span> })}
        </div></Reveal>
    </div>
  </Section>)

export const Experience = () => (
  <Section id="experience" title="Experience">
    <div className="relative ml-3 border-l border-violet-500/40 pl-8">
      {experience.map(e => <Reveal key={e.company}><span className="absolute -left-[7px] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee]" />
        <div className="glass p-6"><h3 className="text-xl font-bold">{e.role} · {e.company}</h3>
          <p className="text-sm text-cyan-300">{e.period}</p>
          <ul className="mt-3 list-disc pl-5 text-white/75">{e.points.map(p => <li key={p}>{p}</li>)}</ul></div></Reveal>)}
    </div>
  </Section>)

export const Education = () => (
  <Section id="education" title="Education">
    <div className="grid gap-4 md:grid-cols-2">
      {education.map(e => <Reveal key={e.institution} className="glass p-6">
        <h3 className="text-xl font-bold">{e.degree}</h3>
        <p className="mt-2 text-cyan-300">{e.institution}</p>
        <p className="mt-1 text-sm text-white/70">{e.location} · {e.status}</p>
      </Reveal>)}
    </div>
  </Section>)

function Tilt({ children, className, ...p }) { // 3D tilt on hover
  const r = useRef()
  const mv = e => { const b = r.current.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5
    r.current.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)` }
  return <div ref={r} onMouseMove={mv} onMouseLeave={() => (r.current.style.transform = '')} className={`transition-transform duration-150 ${className}`} {...p}>{children}</div>
}

export function Projects() {
  const [open, setOpen] = useState(null)
  return (<Section id="projects" title="Projects">
    <div className="grid gap-6 md:grid-cols-3">
      {projects.map((p, i) => <Reveal key={p.title} i={i}><Tilt className="glass h-full cursor-pointer overflow-hidden" onClick={() => setOpen(p)}>
        {p.images[0] ? <img src={p.images[0]} alt={p.title} loading="lazy" className="h-40 w-full object-cover object-top" />
          : <div className="grid h-40 place-items-center bg-violet-500/10 text-sm text-white/40">Add screenshot</div>}
        <div className="p-5"><h3 className="font-bold">{p.title}</h3>
          <p className="mt-2 text-sm text-cyan-300">{p.stack.join(' · ')}</p></div></Tilt></Reveal>)}
    </div>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}
      className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <motion.div initial={{ scale: .9 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()}
        className="glass max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[#0b1024] p-6">
        <h3 className="text-2xl font-bold">{open.title}</h3>
        <p className="mt-3 text-white/80">{open.desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">{open.stack.map(s => <span key={s} className="glass px-3 py-1 text-xs">{s}</span>)}</div>
        <div className="mt-4 grid gap-3">{open.images.map(src => <img key={src} src={src} alt="" loading="lazy" className="rounded-lg" />)}</div>
        <div className="mt-6 flex gap-3">{open.live && <a className="btn" href={open.live} target="_blank" rel="noreferrer">Live</a>}
          {open.github && <a className="btn btn-ghost" href={open.github} target="_blank" rel="noreferrer">GitHub</a>}
          <button className="ml-auto text-white/60" onClick={() => setOpen(null)}>Close</button></div>
      </motion.div></motion.div>}</AnimatePresence>
  </Section>)
}

export const Skills = () => (
  <Section id="skills" title="Skills">
    <div className="grid gap-6 md:grid-cols-2">
      {Object.entries(skills).map(([cat, list], i) => <Reveal key={cat} i={i} className="glass p-6">
        <h3 className="mb-4 font-bold">{cat}</h3>
        <div className="flex flex-wrap gap-2">{list.map(s => <span key={s} className="rounded-full border border-violet-400/40 px-3 py-1 text-sm shadow-[0_0_10px_rgba(139,92,246,.3)] transition hover:scale-110 hover:border-cyan-300">{s}</span>)}</div>
      </Reveal>)}
    </div>
  </Section>)

export const Services = () => (
  <Section id="services" title="Services">
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => <Reveal key={s.title} i={i} className="glass flex flex-col p-6">
        <h3 className="font-bold">{s.title}</h3><p className="mt-2 flex-1 text-sm text-white/70">{s.text}</p>
        <Magnetic href={`#contact`} className="mt-5 text-center text-sm">Get a Quote</Magnetic></Reveal>)}
    </div>
  </Section>)

export const Achievements = () => (
  <Section id="achievements" title="Achievements">
    <div className="grid gap-4 md:grid-cols-2">
      {achievements.map((a, i) => <Reveal key={a} i={i} className="glass p-5">{a}</Reveal>)}
    </div>
  </Section>)

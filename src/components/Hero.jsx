import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data'
import Magnetic from './Magnetic'
const hasWebGL = () => { try { return !!document.createElement('canvas').getContext('webgl') } catch { return false } }
export default function Hero({ scene, ready }) {
  const [i, setI] = useState(0), [txt, setTxt] = useState(''), [del, setDel] = useState(false)
  useEffect(() => { // typewriter
    const full = profile.roles[i]
    const t = setTimeout(() => {
      if (!del) { setTxt(full.slice(0, txt.length + 1)); if (txt === full) setDel(true) }
      else { setTxt(full.slice(0, txt.length - 1)); if (!txt.length) { setDel(false); setI((i + 1) % profile.roles.length) } }
    }, del ? 40 : txt === full ? 1200 : 80)
    return () => clearTimeout(t)
  }, [txt, del, i])
  return (
    <section id="top" className="relative grid min-h-screen place-items-center overflow-hidden px-6">
      <div className="absolute inset-0 -z-0 opacity-90">{ready && hasWebGL() ? scene : <div className="mesh" />}</div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={ready ? { opacity: 1, y: 0 } : {}} className="relative z-10 text-center">
        <h1 className="text-5xl font-extrabold md:text-7xl">Hi, I'm <span className="grad">Amrutha</span></h1>
        <p className="mt-4 h-8 font-head text-xl text-cyan-300 md:text-2xl">{txt}<span className="animate-pulse">|</span></p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Magnetic href="#projects">View My Work</Magnetic>
          <Magnetic href="#contact" className="btn-ghost">Hire Me</Magnetic>
        </div>
      </motion.div>
    </section>)
}

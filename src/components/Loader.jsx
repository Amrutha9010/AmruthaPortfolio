import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
export default function Loader({ onDone }) {
  const [show, setShow] = useState(true)
  useEffect(() => { const t = setTimeout(() => { setShow(false); onDone() }, 1600); return () => clearTimeout(t) }, [])
  return show ? (
    <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] grid place-items-center bg-[#070b1a]">
      <motion.h1 initial={{ scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .8 }}
        className="grad text-7xl font-extrabold">AC</motion.h1>
    </motion.div>) : null
}

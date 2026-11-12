import { useEffect, useRef } from 'react'
export default function Cursor() {
  const el = useRef()
  useEffect(() => {
    let x = 0, y = 0, cx = 0, cy = 0, raf
    const move = e => { x = e.clientX; y = e.clientY }
    const loop = () => { cx += (x - cx) * .18; cy += (y - cy) * .18; // eased follow = glow trail
      if (el.current) el.current.style.transform = `translate(${cx - 7}px,${cy - 7}px)`; raf = requestAnimationFrame(loop) }
    addEventListener('mousemove', move); loop()
    return () => { removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])
  return <div ref={el} className="cursor" />
}

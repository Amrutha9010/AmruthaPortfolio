import { useRef } from 'react'
// Button/link that pulls toward the cursor
export default function Magnetic({ as: T = 'a', className = '', ...p }) {
  const r = useRef()
  const mv = e => { const b = r.current.getBoundingClientRect()
    r.current.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * .3}px,${(e.clientY - b.top - b.height / 2) * .3}px)` }
  return <T ref={r} onMouseMove={mv} onMouseLeave={() => (r.current.style.transform = '')}
    className={`btn transition-transform duration-200 ${className}`} {...p} />
}

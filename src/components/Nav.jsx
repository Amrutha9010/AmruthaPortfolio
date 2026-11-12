const links = ['about', 'education', 'experience', 'projects', 'skills', 'achievements', 'contact']
export default function Nav() {
  return (
    <nav className="glass fixed left-1/2 top-4 z-50 flex max-w-[95vw] -translate-x-1/2 gap-4 overflow-x-auto px-5 py-3 text-sm">
      <a href="#top" className="grad font-head font-bold">AC</a>
      {links.map(l => <a key={l} href={`#${l}`} className="capitalize text-white/70 hover:text-white">{l}</a>)}
    </nav>)
}

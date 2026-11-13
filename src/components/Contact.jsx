import { useState } from 'react'
import { profile } from '../data'
import Magnetic from './Magnetic'
export default function Contact() {
  const [status, setStatus] = useState('')
  const submit = e => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const text = `${profile.whatsappMsg}\n\nName: ${form.get('name')}\nEmail: ${form.get('email')}\nMessage: ${form.get('message')}`
    window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }
  const inp = 'w-full rounded-lg border border-white/15 bg-white/5 p-3 outline-none focus:border-cyan-300'
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-16">
      <img src={profile.photo} alt="Amrutha Chappa" width="1122" height="1402" loading="lazy"
        className="mb-4 h-16 w-16 rounded-full border-2 border-violet-400 object-cover object-top" />
      <h2 className="grad mb-8 text-4xl font-extrabold md:text-5xl">Contact</h2>
      <form onSubmit={submit} className="glass grid gap-4 p-6">
        <input name="name" required placeholder="Name" className={inp} />
        <input name="email" type="email" required placeholder="Email" className={inp} />
        <textarea name="message" required rows="4" placeholder="Message" className={inp} />
        <button className="btn">Send message</button><p className="text-sm text-cyan-300" role="status">{status}</p>
      </form>
      <div className="mt-8 flex flex-wrap gap-3">
        <Magnetic href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(profile.whatsappMsg)}`} target="_blank" rel="noreferrer">WhatsApp</Magnetic>
        <Magnetic href={`mailto:${profile.email}`} className="btn-ghost">Email</Magnetic>
        <Magnetic href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn</Magnetic>
        <Magnetic href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">GitHub</Magnetic>
        <Magnetic href={profile.resume} download className="btn-ghost">Download Resume</Magnetic>
      </div>
    </section>)
}

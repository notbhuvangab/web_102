import { Link, useLocation } from 'react-router-dom'

export function Navigation() {
  const location = useLocation()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/create', label: 'Create a Platypus!' },
    { href: '/gallery', label: 'Platypus Gallery' },
  ]

  return (
    <nav className="w-48 min-h-screen bg-zinc-400 border-r-4 border-black p-0 flex flex-col">
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className={`px-6 py-6 text-black font-bold border-b-4 border-black hover:bg-white transition-none ${
            location.pathname === link.href ? 'bg-white' : ''
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

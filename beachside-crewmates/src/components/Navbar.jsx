import { Link, NavLink } from 'react-router-dom'
import { Palmtree, Shell } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="Beachside Crewmates home">
          <span className="brand-mark"><Palmtree size={25} /></span>
          <span className="brand-words">
            <strong>Beachside</strong>
            <span>Crewmates</span>
          </span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/gallery">My Crew</NavLink>
          <NavLink to="/create">Add Villager</NavLink>
        </nav>
        <span className="nav-shell" aria-hidden="true"><Shell size={25} /></span>
      </div>
    </header>
  )
}

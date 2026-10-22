import { Link } from 'react-router-dom'
import { ArrowRight, Waves, Shell, Palmtree, Sparkles } from 'lucide-react'
import Wave from '../components/Wave.jsx'

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-sun" aria-hidden="true" />
        <div className="hero-content">
          <span className="eyebrow"><Sparkles size={15} /> Your island, your crew</span>
          <h1>Build your dream <span>island crew!</span></h1>
          <p>Bring your favorite villagers together, give everyone a role, and make your own little slice of paradise.</p>
          <div className="hero-actions">
            <Link to="/gallery" className="button button-coral button-large">Meet the crew <ArrowRight size={18} /></Link>
            <Link to="/create" className="button button-glass button-large">Add a villager</Link>
          </div>
          <div className="hero-note"><Waves size={17} /> Good vibes. Cool villagers. Endless summer.</div>
        </div>
        <div className="hero-character" aria-label="Illustrated island villager">
          <div className="character-halo" />
          <span className="hero-character-emoji">🐶</span>
          <span className="hero-flower">🌺</span>
          <span className="hero-shell"><Shell size={26} /></span>
          <div className="character-caption"><strong>You need a break into the island life don't you?</strong><span>Come on in!</span></div>
        </div>
        <div className="hero-beach-line" aria-hidden="true" />
      </section>
      <Wave />
      <section className="home-features section-wrap">
        <div className="section-heading">
          <span className="eyebrow"><Palmtree size={15} /> A little island magic</span>
          <h2>You Control Your Dream Team</h2>
          <p>Build the crew you want and make every villager feel at home.</p>
        </div>
        <div className="feature-grid">
          <article className="feature-card feature-mint"><span>🐚</span><h3>Make it yours</h3><p>Choose a name, personality, role, and specialty for every island resident.</p></article>
          <article className="feature-card feature-pink"><span>🌸</span><h3>Keep your crew close</h3><p>Open unique profiles, edit details, and manage your island crew anytime.</p></article>
          <article className="feature-card feature-blue"><span>🌊</span><h3>Grow together</h3><p>Track role balance and your Island Harmony score as your crew grows.</p></article>
        </div>
        <div className="bottom-cta">
          <div><span className="eyebrow">Your dream island is calling</span><h2>Ready to meet your crew?</h2></div>
          <Link to="/gallery" className="button button-teal">See your villagers <ArrowRight size={17} /></Link>
        </div>
      </section>
    </main>
  )
}

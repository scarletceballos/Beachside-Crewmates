import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Edit3, CalendarDays, Heart, Leaf, MessageCircle, Star, Waves, Copy, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import VillagerAvatar from '../components/VillagerAvatar.jsx'
import { categoryIcons, personalityEmojis } from '../data/villagerOptions.js'

export default function VillagerDetail({ getVillager, deleteVillager }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [villager, setVillager] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    getVillager(id).then((result) => {
      if (!active) return
      setVillager(result.data || null)
      setError(result.error || '')
      setLoading(false)
    })
    return () => { active = false }
  }, [id, getVillager])

  const copyProfileLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch { setError('Could not copy automatically. Copy the URL from your browser address bar.') }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${villager.name} from your island? This cannot be undone.`)) return
    const result = await deleteVillager(villager.id)
    if (result?.error) setError(result.error)
    else navigate('/gallery')
  }

  if (loading) return <main className="page-shell"><div className="loading-state">Finding your villager...</div></main>
  if (error && !villager) return <main className="page-shell"><div className="notice error-message">{error}</div><Link to="/gallery" className="button button-teal">Back to gallery</Link></main>
  if (!villager) return <main className="page-shell"><div className="empty-state"><span>🐚</span><h2>Villager not found</h2><p>This profile may have been deleted.</p><Link to="/gallery" className="button button-teal">Back to gallery</Link></div></main>

  return (
    <main className="page-shell detail-page">
      <Link to="/gallery" className="back-link"><ArrowLeft size={17} /> Back to your crew</Link>
      {error && <div className="notice error-message">{error}</div>}
      <section className="detail-card">
        <div className="detail-art">
          <div className="detail-sun" />
          <span className="detail-decoration deco-shell">🐚</span>
          <span className="detail-decoration deco-flower">🌺</span>
          <VillagerAvatar villager={villager} size="detail" />
          <span className="detail-role-chip">{categoryIcons[villager.category]} {villager.category}</span>
        </div>
        <div className="detail-content">
          <span className="eyebrow">Island resident profile</span>
          <h1>{villager.name}</h1>
          <p className="detail-subtitle">{personalityEmojis[villager.personality] || '🌼'} {villager.personality} personality · {villager.specialty}</p>
          <div className="detail-facts">
            <div><span><Leaf size={18} /></span><div><small>Island role</small><strong>{villager.category}</strong></div></div>
            <div><span><Star size={18} /></span><div><small>Specialty</small><strong>{villager.specialty}</strong></div></div>
            <div><span><Heart size={18} /></span><div><small>Personality</small><strong>{villager.personality}</strong></div></div>
            <div><span><CalendarDays size={18} /></span><div><small>Joined the island</small><strong>{villager.created_at ? new Date(villager.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}</strong></div></div>
          </div>
          <div className="about-box"><h2><Waves size={18} /> A little about {villager.name}</h2><p>{villager.favorite_activity || `${villager.name} loves spending time around the island.`}</p></div>
          <div className="quote-box"><MessageCircle size={18} /><div><small>Favorite phrase</small><p>{villager.favorite_phrase ? `“${villager.favorite_phrase}”` : 'No favorite phrase added yet.'}</p></div></div>
          <div className="detail-actions">
            <Link to={`/villager/${villager.id}/edit`} className="button button-coral"><Edit3 size={17} /> Edit villager</Link>
            <button className="button button-outline" onClick={copyProfileLink}><Copy size={16} /> {copied ? 'Link copied' : 'Copy profile link'}</button>
            <button className="button button-outline-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </section>
    </main>
  )
}

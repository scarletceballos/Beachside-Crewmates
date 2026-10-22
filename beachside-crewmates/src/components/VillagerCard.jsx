import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import VillagerAvatar from './VillagerAvatar.jsx'
import { categoryIcons, personalityEmojis } from '../data/villagerOptions.js'

export default function VillagerCard({ villager, index = 0 }) {
  return (
    <article className="villager-card float-in" style={{ '--card-delay': `${index * 70}ms` }}>
      <Link className="card-main-link" to={`/villager/${villager.id}`} aria-label={`View ${villager.name}`}>
        <div className="card-art">
          <span className="card-sun" aria-hidden="true" />
          <span className="card-cloud cloud-a" aria-hidden="true" />
          <span className="card-cloud cloud-b" aria-hidden="true" />
          <div className="card-ocean-waves" aria-hidden="true"><span /><span /></div>
          <span className="card-glint glint-a" aria-hidden="true">✦</span>
          <span className="card-glint glint-b" aria-hidden="true">✧</span>
          <VillagerAvatar villager={villager} size="card" />
          <span className="card-category">{categoryIcons[villager.category] || '🌴'} {villager.category}</span>
        </div>
        <div className="card-content">
          <div className="card-title-row">
            <h3>{villager.name}</h3>
            <ArrowUpRight size={17} aria-hidden="true" />
          </div>
          <p className="card-meta">{personalityEmojis[villager.personality] || '🌼'} {villager.personality}</p>
          <p className="card-specialty">{villager.specialty}</p>
        </div>
      </Link>
      <Link className="button button-small button-coral card-button" to={`/villager/${villager.id}`}>
        View profile
      </Link>
    </article>
  )
}

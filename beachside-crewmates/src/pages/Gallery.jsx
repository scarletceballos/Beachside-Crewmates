import { Link } from 'react-router-dom'
import { Plus, Users, Heart, Sparkles, Leaf, Shell } from 'lucide-react'
import VillagerCard from '../components/VillagerCard.jsx'
import StatCard from '../components/StatCard.jsx'
import { categories, personalities, categoryIcons } from '../data/villagerOptions.js'

export function getCrewStats(villagers) {
  const total = villagers.length
  const roleCount = Object.fromEntries(categories.map((role) => [role, villagers.filter((v) => v.category === role).length]))
  const personalityCount = Object.fromEntries(personalities.map((p) => [p, villagers.filter((v) => v.personality === p).length]))
  const distinctRoles = categories.filter((role) => roleCount[role] > 0).length
  const topPersonality = total
    ? Object.entries(personalityCount).filter(([, count]) => count > 0).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
    : '—'
  const harmony = total === 0 ? 0 : Math.round((distinctRoles / categories.length) * 100)
  return { total, roleCount, personalityCount, distinctRoles, topPersonality, harmony }
}

export default function Gallery({ villagers, loading, error, refresh }) {
  const stats = getCrewStats(villagers)

  return (
    <main className="page-shell">
      <section className="page-heading gallery-heading">
        <div>
          <span className="eyebrow"><Leaf size={15} /> Welcome to your island</span>
          <h1>Your island crew</h1>
          <p>Meet the villagers who make your little corner of paradise special.</p>
        </div>
        <Link className="button button-coral" to="/create"><Plus size={18} /> Add villager</Link>
      </section>

      <section className="harmony-panel">
        <div className="harmony-icon"><Sparkles size={24} /></div>
        <div className="harmony-copy">
          <div className="harmony-title"><strong>Island Harmony</strong><span>{stats.harmony} / 100</span></div>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${stats.harmony}%` }} /></div>
          <p>{stats.total === 0 ? 'Add your first villager to begin building your crew.' : stats.distinctRoles === 4 ? 'All four roles are represented. Your island is in balance!' : `Represent ${4 - stats.distinctRoles} more ${4 - stats.distinctRoles === 1 ? 'role' : 'roles'} to reach full harmony.`}</p>
        </div>
        <div className="harmony-palm" aria-hidden="true">🌴</div>
      </section>

      <section className="stats-grid" aria-label="Crew statistics">
        <StatCard icon={<Users size={22} />} label="Total villagers" value={stats.total} detail="Island residents" />
        <StatCard icon="🌈" label="Roles represented" value={`${stats.distinctRoles} / 4`} detail="Different specialties" />
        <StatCard icon={<Heart size={22} />} label="Top personality" value={stats.topPersonality} detail="Most common type" />
        <StatCard icon="🐚" label="Crew diversity" value={`${stats.total ? Math.round((stats.distinctRoles / 4) * 100) : 0}%`} detail="Role coverage" />
      </section>

      <section className="role-breakdown panel">
        <div className="panel-heading"><div><span className="eyebrow">At a glance</span><h2>Role breakdown</h2></div><span className="tiny-palm">🌴</span></div>
        <div className="role-bars">
          {categories.map((role) => {
            const count = stats.roleCount[role]
            const percentage = stats.total ? Math.round((count / stats.total) * 100) : 0
            return (
              <div className="role-bar-row" key={role}>
                <div className="role-bar-label"><span>{categoryIcons[role]}</span><strong>{role}</strong><span>{count}</span></div>
                <div className="progress-track"><div className={`progress-fill role-fill role-${role.toLowerCase()}`} style={{ width: `${percentage}%` }} /></div>
                <span className="role-percent">{percentage}%</span>
              </div>
            )
          })}
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-heading align-left">
          <span className="eyebrow"><Shell size={15} /> Your island residents</span>
          <h2>Meet the crew <span className="count-pill">{stats.total}</span></h2>
        </div>
        {error && <div className="notice error-message">{error} <button className="text-button" onClick={refresh}>Try again</button></div>}
        {loading ? (
          <div className="loading-state"><span className="loading-palm">🌴</span><p>Collecting seashells and finding your villagers...</p></div>
        ) : villagers.length ? (
          <div className="villager-grid">{villagers.map((villager, index) => <VillagerCard key={villager.id} villager={villager} index={index} />)}</div>
        ) : (
          <div className="empty-state"><span>🐚</span><h3>Your island is waiting for its first resident</h3><p>Add a villager to start your collection and unlock your crew statistics.</p><Link className="button button-coral" to="/create"><Plus size={17} /> Create your first villager</Link></div>
        )}
      </section>
    </main>
  )
}

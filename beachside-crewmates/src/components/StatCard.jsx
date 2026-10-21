export default function StatCard({ icon, label, value, detail }) {
  return (
    <article className="stat-card">
      <span className="stat-icon" aria-hidden="true">{icon}</span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        {detail && <span className="stat-detail">{detail}</span>}
      </div>
    </article>
  )
}

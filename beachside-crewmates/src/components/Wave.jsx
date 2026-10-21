export default function Wave({ className = '' }) {
  return (
    <div className={`wave-divider ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,38 C180,100 330,0 520,40 C700,78 860,82 1030,34 C1200,-5 1320,52 1440,24 L1440,100 L0,100 Z" />
      </svg>
    </div>
  )
}

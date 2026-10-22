import { useEffect, useState } from 'react'
import { Shell } from 'lucide-react'

/** Full-screen ocean curtain used while the app loads saved villagers. */
export default function OceanLoader({ show }) {
  const [visible, setVisible] = useState(show)
  const [phase, setPhase] = useState(show ? 'entering' : 'hidden')

  useEffect(() => {
    let timeout
    if (show) {
      setVisible(true)
      setPhase((current) => current === 'hidden' || current === 'leaving' ? 'entering' : current)
    } else if (visible) {
      setPhase('leaving')
      timeout = window.setTimeout(() => {
        setVisible(false)
        setPhase('hidden')
      }, 1050)
    }
    return () => window.clearTimeout(timeout)
  }, [show, visible])

  if (!visible) return null

  const finishEntrance = (event) => {
    if (event.target === event.currentTarget && show) setPhase('settled')
  }

  return (
    <div
      className={`ocean-loader ocean-loader--${phase}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Beachside Crewmates"
      onAnimationEnd={finishEntrance}
    >
      <div className="ocean-loader-surface" aria-hidden="true">
        <span className="loader-wave loader-wave-back" />
        <span className="loader-wave loader-wave-front" />
        <span className="loader-bubble bubble-one" />
        <span className="loader-bubble bubble-two" />
        <span className="loader-bubble bubble-three" />
      </div>
      <div className="ocean-loader-message">
        <Shell size={42} strokeWidth={1.5} />
        <strong>Washing ashore...</strong>
        <span>Gathering your island crew</span>
        <span className="loader-dots" aria-hidden="true">● ● ●</span>
      </div>
    </div>
  )
}

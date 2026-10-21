import { Camera } from 'lucide-react'

export default function VillagerAvatar({ villager, size = 'large', editable = false, onClick }) {
  const hasImage = Boolean(villager?.image_url?.trim())
  return (
    <div
      className={`villager-avatar avatar-${size} avatar-${villager?.color || 'mint'} ${editable ? 'avatar-editable' : ''}`}
      role={editable ? 'button' : undefined}
      tabIndex={editable ? 0 : undefined}
      onClick={editable ? onClick : undefined}
      onKeyDown={editable ? (event) => event.key === 'Enter' && onClick?.() : undefined}
      aria-label={editable ? 'Choose a portrait image' : `${villager?.name || 'Villager'} portrait`}
    >
      {hasImage ? (
        <img src={villager.image_url} alt={`${villager.name} portrait`} />
      ) : (
        <span className="avatar-emoji" aria-hidden="true">{villager?.emoji || '🐻'}</span>
      )}
      <span className="avatar-sparkle sparkle-one" aria-hidden="true">✦</span>
      <span className="avatar-sparkle sparkle-two" aria-hidden="true">✿</span>
      {editable && <span className="avatar-camera"><Camera size={16} /></span>}
    </div>
  )
}

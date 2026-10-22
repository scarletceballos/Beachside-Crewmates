import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle2, Sparkles } from 'lucide-react'
import {
  categories,
  specialtiesByCategory,
  personalities,
  categoryIcons,
} from '../data/villagerOptions.js'
import VillagerAvatar from './VillagerAvatar.jsx'
import { Filter } from 'bad-words'

const profanityFilter = new Filter()
const textFields = ['name', 'specialty', 'personality', 'favorite_activity', 'favorite_phrase']

const emptyVillager = {
  name: '',
  category: '',
  specialty: '',
  personality: '',
  favorite_activity: '',
  favorite_phrase: '',
  image_url: '',
}

export default function VillagerForm({
  initialValue,
  onSubmit,
  submitLabel,
  onDelete,
  busy = false,
  error = '',
}) {
  const [form, setForm] = useState({ ...emptyVillager, ...(initialValue || {}) })
  const [localError, setLocalError] = useState('')
  const [imageInput, setImageInput] = useState(false)

  useEffect(() => {
    setForm({ ...emptyVillager, ...(initialValue || {}) })
  }, [initialValue?.id])

  const specialties = specialtiesByCategory[form.category] || []
  const update = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === 'category' ? { specialty: '' } : {}),
    }))
    setLocalError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.name.trim()) return setLocalError('Enter a villager name.')
    for (const field of textFields) {
      const value = String(form[field] || '').trim()
      if (profanityFilter.isProfane(value)) return setLocalError('Please remove inappropriate language before saving this villager.')
    }
    if (form.name.trim().length > 40) return setLocalError('Villager names must be 40 characters or fewer.')
    if (!form.category) return setLocalError('Choose an island role.')
    if (!form.personality) return setLocalError('Choose a personality.')
    if (!form.specialty || !specialties.includes(form.specialty)) {
      return setLocalError('Choose a specialty available for this role.')
    }
    if (form.image_url && !/^https?:\/\/.+/i.test(form.image_url)) {
      return setLocalError('Portrait URL must start with http:// or https://.')
    }
    setLocalError('')
    await onSubmit({
      name: form.name.trim(),
      category: form.category,
      specialty: form.specialty,
      personality: form.personality,
      favorite_activity: form.favorite_activity.trim(),
      favorite_phrase: form.favorite_phrase.trim(),
      image_url: form.image_url.trim(),
      emoji: initialValue?.emoji || '🐻',
      color: initialValue?.color || 'mint',
    })
  }

  return (
    <form className="villager-form" onSubmit={handleSubmit}>
      <div className="form-layout">
        <aside className="form-preview">
          <VillagerAvatar villager={{ ...form, name: form.name || 'Your villager' }} size="preview" />
          <h3>{form.name || 'Your new friend'}</h3>
          <p>{form.category || 'Choose an island role'}</p>
          <span className="preview-badge"><Sparkles size={14} /> Island resident</span>
          <button type="button" className="text-button" onClick={() => setImageInput((value) => !value)}>
            {imageInput ? 'Hide portrait URL' : 'Add portrait URL'}
          </button>
          {imageInput && (
            <label className="field image-field">
              Portrait image URL
              <input
                type="url"
                value={form.image_url}
                onChange={(event) => update('image_url', event.target.value)}
                placeholder="https://example.com/portrait.png"
              />
              <small>Use a direct image URL you have permission to display. Leave blank for the illustrated avatar.</small>
            </label>
          )}
        </aside>

        <div className="form-fields">
          <label className="field">
            Villager name <span className="required">*</span>
            <input
              value={form.name}
              onChange={(event) => update('name', event.target.value)}
              placeholder="e.g. Rosie"
              maxLength={40}
              required
            />
          </label>

          <fieldset className="field-group">
            <legend>Choose an island role <span className="required">*</span></legend>
            <div className="role-options">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={`role-option ${form.category === category ? 'selected' : ''}`}
                  onClick={() => update('category', category)}
                  aria-pressed={form.category === category}
                >
                  <span>{categoryIcons[category]}</span>
                  <strong>{category}</strong>
                </button>
              ))}
            </div>
          </fieldset>

          <label className="field">
            Personality <span className="required">*</span>
            <select value={form.personality} onChange={(event) => update('personality', event.target.value)} required>
              <option value="">Choose a personality</option>
              {personalities.map((personality) => <option key={personality}>{personality}</option>)}
            </select>
          </label>

          <label className="field">
            Specialty <span className="required">*</span>
            <select
              value={form.specialty}
              onChange={(event) => update('specialty', event.target.value)}
              disabled={!form.category}
              required
            >
              <option value="">{form.category ? 'Choose a specialty' : 'Choose a role first'}</option>
              {specialties.map((specialty) => <option key={specialty}>{specialty}</option>)}
            </select>
            {form.category && <small>Options are limited to the selected role.</small>}
          </label>

          <label className="field">
            Favorite island activity
            <input
              value={form.favorite_activity}
              onChange={(event) => update('favorite_activity', event.target.value)}
              placeholder="e.g. Collecting seashells"
              maxLength={100}
            />
          </label>

          <label className="field">
            Favorite phrase
            <input
              value={form.favorite_phrase}
              onChange={(event) => update('favorite_phrase', event.target.value)}
              placeholder="e.g. Sea you soon!"
              maxLength={100}
            />
          </label>

          {(localError || error) && (
            <div className="form-message error-message" role="alert">
              <AlertCircle size={17} /> {localError || error}
            </div>
          )}
          <div className="form-actions">
            <button className="button button-coral" type="submit" disabled={busy}>
              {busy ? 'Saving...' : submitLabel}
            </button>
            {onDelete && (
              <button className="button button-outline-danger" type="button" onClick={onDelete} disabled={busy}>
                Delete villager
              </button>
            )}
          </div>
          <p className="form-footnote"><CheckCircle2 size={14} /> Fields marked with * are required.</p>
        </div>
      </div>
    </form>
  )
}

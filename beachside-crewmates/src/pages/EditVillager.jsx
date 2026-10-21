import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Edit3 } from 'lucide-react'
import VillagerForm from '../components/VillagerForm.jsx'

export default function EditVillager({ getVillager, updateVillager, deleteVillager }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [villager, setVillager] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    getVillager(id).then((result) => {
      if (!active) return
      setVillager(result.data || null)
      setError(result.error || '')
      setLoading(false)
    })
    return () => { active = false }
  }, [id, getVillager])

  const handleUpdate = async (values) => {
    setBusy(true)
    setError('')
    const result = await updateVillager(id, values)
    setBusy(false)
    if (result?.error) setError(result.error)
    else navigate(`/villager/${id}`)
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${villager.name} from your island? This cannot be undone.`)) return
    setBusy(true)
    const result = await deleteVillager(id)
    setBusy(false)
    if (result?.error) setError(result.error)
    else navigate('/gallery')
  }

  if (loading) return <main className="page-shell"><div className="loading-state">Loading villager details...</div></main>
  if (!villager) return <main className="page-shell"><div className="notice error-message">{error || 'Villager not found.'}</div><Link to="/gallery" className="button button-teal">Back to gallery</Link></main>

  return (
    <main className="page-shell form-page">
      <Link to={`/villager/${id}`} className="back-link"><ArrowLeft size={17} /> Back to profile</Link>
      <div className="page-heading"><div><span className="eyebrow"><Edit3 size={15} /> Update your island resident</span><h1>Edit {villager.name}</h1><p>Make changes and save them to your island crew.</p></div></div>
      <VillagerForm initialValue={villager} onSubmit={handleUpdate} onDelete={handleDelete} submitLabel="Save changes" busy={busy} error={error} />
    </main>
  )
}

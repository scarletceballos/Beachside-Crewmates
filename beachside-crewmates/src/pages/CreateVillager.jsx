import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Palmtree } from 'lucide-react'
import VillagerForm from '../components/VillagerForm.jsx'

export default function CreateVillager({ createVillager }) {
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const handleCreate = async (values) => {
    setBusy(true)
    setError('')
    const result = await createVillager(values)
    setBusy(false)
    if (result?.error) setError(result.error)
    else navigate('/gallery')
  }

  return (
    <main className="page-shell form-page">
      <div className="page-heading">
        <div><span className="eyebrow"><Palmtree size={15} /> A new friend is arriving</span><h1>Create a villager</h1><p>Add a new resident to your sunny island crew.</p></div>
      </div>
      <VillagerForm onSubmit={handleCreate} submitLabel="Welcome to the island" busy={busy} error={error} />
    </main>
  )
}

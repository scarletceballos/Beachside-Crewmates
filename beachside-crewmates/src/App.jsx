import React, { useCallback, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import Wave from './components/Wave.jsx'
import Home from './pages/Home.jsx'
import Gallery from './pages/Gallery.jsx'
import CreateVillager from './pages/CreateVillager.jsx'
import VillagerDetail from './pages/VillagerDetail.jsx'
import EditVillager from './pages/EditVillager.jsx'
import { isSupabaseConfigured, supabase } from './lib/supabase.js'
import { starterVillagers } from './data/villagerOptions.js'
import './App.css'

function AppFooter() {
  return (
    <footer className="site-footer">
      <Wave className="footer-wave" />
      <div className="footer-inner">
        <div className="footer-brand"><span>🌴</span><strong>Beachside Crewmates</strong></div>
        <p>Build a crew. Create your story.</p>
        <span className="footer-shells" aria-hidden="true">🐚　🌺　🪸</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [villagers, setVillagers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refreshVillagers = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setVillagers(starterVillagers)
      setError('Supabase is not configured yet. Showing sample villagers; create, edit, and delete are disabled until you add your .env values.')
      setLoading(false)
      return
    }
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('villagers')
      .select('*')
      .order('created_at', { ascending: false })
    if (fetchError) {
      setError(`Could not load villagers: ${fetchError.message}`)
      setVillagers([])
    } else {
      setError('')
      setVillagers(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => { refreshVillagers() }, [refreshVillagers])

  const createVillager = useCallback(async (values) => {
    if (!isSupabaseConfigured) return { error: 'Add your Supabase URL and publishable key to .env, then restart the dev server.' }
    const { data, error: insertError } = await supabase.from('villagers').insert(values).select().single()
    if (insertError) return { error: `Could not create villager: ${insertError.message}` }
    setVillagers((current) => [data, ...current])
    setError('')
    return { data }
  }, [])

  const getVillager = useCallback(async (id) => {
    if (id.startsWith('demo-') && !isSupabaseConfigured) {
      const demo = starterVillagers.find((villager) => villager.id === id)
      return demo ? { data: demo } : { error: 'Villager not found.' }
    }
    if (!isSupabaseConfigured) return { error: 'Configure Supabase to load saved villager profiles.' }
    const { data, error: fetchError } = await supabase.from('villagers').select('*').eq('id', id).maybeSingle()
    if (fetchError) return { error: `Could not load villager: ${fetchError.message}` }
    return data ? { data } : { error: 'Villager not found.' }
  }, [])

  const updateVillager = useCallback(async (id, values) => {
    if (!isSupabaseConfigured) return { error: 'Configure Supabase before editing saved villagers.' }
    const { data, error: updateError } = await supabase.from('villagers').update({ ...values, updated_at: new Date().toISOString() }).eq('id', id).select().single()
    if (updateError) return { error: `Could not update villager: ${updateError.message}` }
    setVillagers((current) => current.map((villager) => villager.id === id ? data : villager))
    return { data }
  }, [])

  const deleteVillager = useCallback(async (id) => {
    if (!isSupabaseConfigured) return { error: 'Configure Supabase before deleting villagers.' }
    const { error: deleteError } = await supabase.from('villagers').delete().eq('id', id)
    if (deleteError) return { error: `Could not delete villager: ${deleteError.message}` }
    setVillagers((current) => current.filter((villager) => villager.id !== id))
    return {}
  }, [])

  return (
    <div className="app">
      <Navbar />
      {!isSupabaseConfigured && (
        <div className="setup-banner"><AlertTriangle size={17} /><span>Preview mode: add your Supabase credentials to enable persistent data.</span></div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery villagers={villagers} loading={loading} error={error} refresh={refreshVillagers} />} />
        <Route path="/create" element={<CreateVillager createVillager={createVillager} />} />
        <Route path="/villager/:id" element={<VillagerDetail getVillager={getVillager} deleteVillager={deleteVillager} />} />
        <Route path="/villager/:id/edit" element={<EditVillager getVillager={getVillager} updateVillager={updateVillager} deleteVillager={deleteVillager} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <AppFooter />
    </div>
  )
}

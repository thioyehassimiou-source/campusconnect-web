'use client'

import { useState } from 'react'
import { bookRoom } from '../actions'
import { useToast } from '@/components/ui/Toast'

interface BookingFormProps {
  roomId?: string
}

export function BookingForm({ roomId }: BookingFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!roomId) {
      toast('Veuillez sélectionner une salle', 'error')
      return
    }

    setLoading(true)
    try {
      // In a real app, we'd get these from the form state
      await bookRoom(roomId, new Date().toISOString(), new Date(Date.now() + 3600000).toISOString(), 'Travail de groupe')
      toast('Réservation confirmée avec succès !', 'success')
    } catch (error) {
      toast('Erreur lors de la réservation. Veuillez réessayer.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm mt-8">
      <h3 className="text-sm font-black text-primary mb-5 uppercase tracking-widest">Réserver ce créneau</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[10px] font-black text-on-surface-variant uppercase mb-1.5 px-1 tracking-widest">
            Motif de la réservation
          </label>
          <input 
            className="w-full bg-surface-container-low border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 p-3 transition-shadow" 
            placeholder="Ex: Travail de groupe Projet Web" 
            type="text"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black text-on-surface-variant uppercase mb-1.5 px-1 tracking-widest">
              Personnes
            </label>
            <select className="w-full bg-surface-container-low border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 p-3 appearance-none cursor-pointer">
              <option>2 personnes</option>
              <option>4 personnes</option>
              <option>6 personnes</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-on-surface-variant uppercase mb-1.5 px-1 tracking-widest">
              Équipement
            </label>
            <select className="w-full bg-surface-container-low border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 p-3 appearance-none cursor-pointer">
              <option>Vidéoprojecteur</option>
              <option>Tableau blanc</option>
              <option>Aucun</option>
            </select>
          </div>
        </div>
        <button 
          disabled={loading}
          className={`w-full bg-gradient-to-br from-primary to-primary-container text-white font-black py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-4 uppercase text-xs tracking-widest
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-primary/30'}
          `} 
          type="submit"
        >
          {loading ? 'Traitement...' : 'Confirmer la réservation'}
        </button>
      </form>
    </div>
  )
}

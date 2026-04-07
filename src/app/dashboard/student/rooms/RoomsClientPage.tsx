'use client'

import { useState } from 'react'
import { Filter, Plus, Calendar as CalendarIcon, MapPin } from 'lucide-react'
import { BuildingFilters } from '@/features/rooms/components/BuildingFilters'
import { RoomCard } from '@/features/rooms/components/RoomCard'
import { RoomTimeline } from '@/features/rooms/components/RoomTimeline'
import { BookingForm } from '@/features/rooms/components/BookingForm'
import { Room } from '@/features/rooms/types'

const buildings = ['Bâtiment A - Condorcet', 'Bâtiment B - Curie', 'Bibliothèque Centrale']

interface RoomsClientPageProps {
  initialRooms: any[]
  initialBookings: any[]
}

export default function RoomManagementPage({ initialRooms, initialBookings }: RoomsClientPageProps) {
  const [activeBuilding, setActiveBuilding] = useState('all')
  const rooms = initialRooms
  const [selectedRoom, setSelectedRoom] = useState<Room>(rooms[0])

  const filteredRooms = activeBuilding === 'all' 
    ? rooms 
    : rooms.filter(r => r.building?.includes(activeBuilding.replace('Bâtiment ', '').split(' - ')[0]))

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black font-headline text-primary mb-2 tracking-tight">Gestion des Salles</h1>
          <p className="text-on-surface-variant font-medium">Consultez la disponibilité en temps réel et réservez vos espaces de travail.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button disabled className="cursor-not-allowed opacity-50 flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-bold border border-outline-variant/20 hover:bg-surface-container-low transition-all shadow-sm">
            <Filter className="h-4 w-4" />
            <span>Filtres avancés</span>
          </button>
          <button disabled className="cursor-not-allowed opacity-50 flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-br from-primary to-primary-container text-white font-bold shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" />
            <span>Nouvelle Réservation (Bientôt)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
        {/* Left Column: Room Grid & Filters */}
        <div className="xl:col-span-7 space-y-8">
          <BuildingFilters 
            buildings={buildings} 
            activeBuilding={activeBuilding} 
            onSelect={setActiveBuilding} 
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard 
                key={room.id} 
                room={room} 
                isActive={selectedRoom?.id === room.id}
                onClick={() => setSelectedRoom(room)}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Room Details & Booking (Sticky) */}
        <div className="xl:col-span-5 sticky top-24">
          <div className="bg-surface-container-low rounded-3xl overflow-hidden shadow-2xl shadow-primary/5 ring-1 ring-black/5 animate-in slide-in-from-right-4 duration-500">
            {/* Detail Header Image */}
            <div className="h-56 w-full relative">
              <img 
                alt={selectedRoom?.name} 
                className="w-full h-full object-cover" 
                src={selectedRoom?.image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white">
                      <MapPin className="h-5 w-5" />
                   </div>
                   <h2 className="text-white text-2xl font-black font-headline tracking-tight">Détails : {selectedRoom?.name}</h2>
                </div>
              </div>
            </div>

            {/* Planning & Reservation */}
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-primary flex items-center gap-2 uppercase tracking-widest text-xs">
                  <CalendarIcon className="h-4 w-4" />
                  Planning du jour
                </h3>
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest bg-surface-container-high px-2 py-1 rounded-md">
                  Aujourd'hui
                </span>
              </div>

              <RoomTimeline slots={initialBookings} />

              <BookingForm roomId={selectedRoom?.id} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="mt-20 pt-10 border-t border-outline-variant/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-on-surface-variant text-xs font-bold uppercase tracking-widest">
        <div className="flex items-center gap-8">
          <span className="cursor-not-allowed opacity-50 transition-colors">Aide</span>
          <span className="cursor-not-allowed opacity-50 transition-colors">Règlement</span>
          <span className="cursor-not-allowed opacity-50 transition-colors">Signaler</span>
        </div>
        <p className="opacity-60">© 2026 CampusConnect - Direction du Numérique</p>
      </footer>
    </div>
  )
}

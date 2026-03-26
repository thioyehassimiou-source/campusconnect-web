import { Users, Monitor, Wifi, Book, LogIn, Laptop, Presentation } from 'lucide-react'
import { Room } from '../types'

interface RoomCardProps {
  room: Room
  isActive?: boolean
  onClick: () => void
}

export function RoomCard({ room, isActive, onClick }: RoomCardProps) {
  const isAvailable = room.status === 'Disponible'

  const getIcon = (item: string) => {
    switch (item.toLowerCase()) {
      case 'équipée': return <Monitor className="h-3.5 w-3.5" />
      case 'fibre': return <Wifi className="h-3.5 w-3.5" />
      case 'zone calme': return <Book className="h-3.5 w-3.5" />
      case 'amphithéâtre': return <Presentation className="h-3.5 w-3.5" />
      default: return <LogIn className="h-3.5 w-3.5" />
    }
  }

  return (
    <div 
      onClick={onClick}
      className={`
        bg-surface-container-lowest p-6 rounded-2xl transition-all duration-300 border cursor-pointer group relative overflow-hidden
        ${isActive 
          ? 'ring-2 ring-primary border-transparent shadow-xl translate-y-[-4px]' 
          : 'border-outline-variant/5 shadow-sm hover:shadow-lg hover:translate-y-[-2px]'
        }
        ${!isAvailable && 'opacity-80'}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110
          ${isAvailable ? 'bg-blue-50 text-primary' : 'bg-surface-variant text-on-surface-variant'}
        `}>
          {room.type === 'lab' ? <Laptop className="h-6 w-6" /> : <Monitor className="h-6 w-6" />}
        </div>
        <span className={`
          px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
          ${isAvailable ? 'bg-green-100 text-green-700' : 'bg-error-container text-on-error-container'}
        `}>
          {room.status}
        </span>
      </div>
      
      <h3 className="text-lg font-black font-headline text-on-surface mb-1 tracking-tight">{room.name}</h3>
      <p className="text-sm text-on-surface-variant font-medium mb-4">{room.building} • {room.floor}</p>
      
      <div className="flex items-center gap-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
        <div className="flex items-center gap-1.5 bg-surface-container-low px-2 py-1 rounded-lg">
          <Users className="h-3.5 w-3.5" />
          <span>{room.capacity} places</span>
        </div>
        <div className="flex items-center gap-1.5 bg-surface-container-low px-2 py-1 rounded-lg">
          {getIcon(room.equipment[0] || '')}
          <span>{room.equipment[0] || 'Standard'}</span>
        </div>
      </div>
    </div>
  )
}

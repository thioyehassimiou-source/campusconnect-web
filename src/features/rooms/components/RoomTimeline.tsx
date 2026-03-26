import { Clock } from 'lucide-react'
import { TimeSlot } from '../types'

interface RoomTimelineProps {
  slots: TimeSlot[]
}

export function RoomTimeline({ slots }: RoomTimelineProps) {
  return (
    <div className="space-y-4">
      {slots.map((slot, index) => (
        <div key={index} className="flex gap-4">
          <span className={`text-xs font-black w-10 py-3 ${slot.isUserSelection ? 'text-primary' : 'text-on-surface-variant opacity-60'}`}>
            {slot.time}
          </span>
          <div className={`
            flex-1 p-4 rounded-xl border-l-4 transition-all duration-300
            ${slot.isUserSelection 
              ? 'bg-secondary-container border-primary ring-2 ring-primary/5 scale-[1.02]' 
              : slot.isAvailable 
                ? 'bg-green-50/50 border-green-500 hover:bg-green-50' 
                : 'bg-surface-container-high/50 border-primary/20 opacity-70'
            }
          `}>
            {slot.isUserSelection ? (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-black text-primary uppercase tracking-tight">Votre sélection</p>
                  <p className="text-[10px] text-primary/70 font-bold">12:00 - 14:00</p>
                </div>
                <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
              </div>
            ) : slot.isAvailable ? (
              <p className="text-xs font-black text-green-700 uppercase tracking-tight">Libre</p>
            ) : (
              <div>
                <p className="text-xs font-black text-primary uppercase tracking-tight">{slot.title}</p>
                {slot.instructor && <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{slot.instructor}</p>}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

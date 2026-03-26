export type RoomStatus = 'Disponible' | 'Occupé' | 'Maintenance'

export interface Room {
  id: string
  name: string
  building: string
  floor: string
  capacity: number
  equipment: string[]
  status: RoomStatus
  image: string
  type?: 'meeting' | 'lab' | 'study'
}

export interface TimeSlot {
  time: string
  title: string
  instructor?: string
  isAvailable: boolean
  isUserSelection?: boolean
}

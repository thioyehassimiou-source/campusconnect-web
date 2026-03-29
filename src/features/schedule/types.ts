export type EventType = 'CM' | 'TD' | 'Lab' | 'Seminar'

export interface ScheduleEvent {
  id: string
  title: string
  type: EventType
  startTime: string // HH:mm format
  endTime: string   // HH:mm format
  day: number       // 0-4 (Mon-Fri)
  location?: string
  instructor?: string
  isCurrent?: boolean
}

export interface DayInfo {
  name: string
  date: number
  isToday?: boolean
}

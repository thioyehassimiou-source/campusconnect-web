export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical'

export interface Ticket {
  id: string
  reference: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  category: string
  createdAt: string
  updatedAt: string
  assignee?: {
    name: string
    avatar: string
  }
}

export interface TicketActivity {
  id: string
  ticketId: string
  type: 'message' | 'system' | 'attachment'
  role: 'user' | 'support' | 'system'
  author?: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  attachmentUrl?: string
}

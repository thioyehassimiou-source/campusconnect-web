export interface AIMessage {
  id: string
  role: 'assistant' | 'user'
  content: string
  timestamp: string
  dataBlock?: AIDataBlock
}

export interface AIDataBlock {
  type: 'documents' | 'schedule' | 'sources'
  items: Array<{
    label: string
    icon: string
  }>
}

export interface Suggestion {
  id: string
  text: string
  icon: string
}

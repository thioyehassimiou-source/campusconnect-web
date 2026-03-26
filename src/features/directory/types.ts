export interface ContactLead {
  name: string
  role: string
  avatar: string
}

export interface DepartmentContact {
  id: string
  name: string
  description: string
  category: string
  icon: string
  lead: ContactLead
  email: string
  phone: string
  location: string
  hours: string
  isPriority?: boolean
}

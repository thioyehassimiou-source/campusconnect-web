export interface Profile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  bio: string
  avatar: string
  enrollmentId: string
  enrolledSince: string
  faculty: string
  curriculum: string
  year: string
}

export interface AccountStatus {
  badge: 'ACTIF' | 'INACTIF'
  library: 'AUTORISÉ' | 'SUSPENDU'
  tuition: 'À JOUR' | 'EN ATTENTE'
}

export interface ConnectedService {
  name: string
  email?: string
  username?: string
  status: 'CONNECTED' | 'DISCONNECTED'
  icon: string
  color: string
}

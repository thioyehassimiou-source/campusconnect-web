export interface Course {
  id: string
  title: string
  code: string
  instructor: {
    name: string
    avatar: string
  }
  schedule: string
  location: string
  credits: number
  description: string
  category: string
  image?: string
}

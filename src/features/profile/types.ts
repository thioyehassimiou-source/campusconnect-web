import { z } from 'zod'

export const ProfileSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string().min(2, 'Le nom est trop court').max(100, 'Le nom est trop long').nullable(),
  avatar_url: z.string().url('URL d\'avatar invalide').nullable().optional(),
  role: z.enum(['student', 'teacher', 'admin']).default('student'),
  student_id: z.string().nullable().optional(),
  bac_series: z.enum(['SM', 'SE', 'SS']).nullable().optional(),
  bac_average: z.number().min(0).max(20).nullable().optional(),
  interests: z.array(z.string()).default([]),
  faculty: z.string().nullable().optional(),
  department: z.string().nullable().optional(),
  level: z.string().nullable().optional(),
  service: z.string().nullable().optional(),
  bio: z.string().max(500, 'La biographie est trop longue').nullable().optional(),
  email: z.string().email().optional(), // From auth.users but often joined
  phone: z.string().max(20).nullable().optional(),
  birth_date: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export type Profile = z.infer<typeof ProfileSchema>

export const ProfileUpdateSchema = ProfileSchema.omit({ 
  id: true, 
  role: true, 
  student_id: true,
  email: true 
}).partial()

export type ProfileUpdate = z.infer<typeof ProfileUpdateSchema>

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

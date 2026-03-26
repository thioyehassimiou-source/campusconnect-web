import { requireRole } from '@/lib/auth'
import ContactsClientPage from './ContactsClientPage'
import { createClient } from '@/lib/supabase/server'

export default async function ContactsPage() {
  await requireRole(['student', 'teacher', 'admin'])
  
  const supabase = await createClient()
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('full_name', { ascending: true })
  
  return <ContactsClientPage initialProfiles={profiles || []} />
}

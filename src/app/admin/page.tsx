import { redirect } from 'next/navigation'

export default function AdminPage() {
  // Redirect to the users list by default as it's the main entry point
  redirect('/admin/users')
}

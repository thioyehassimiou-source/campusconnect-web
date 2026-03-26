import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { getUserContext } from '@/lib/auth'

export async function DashboardLayout({
  children,
  role
}: {
  children: React.ReactNode,
  role: string
}) {
  const ctx = await getUserContext()
  const profile = ctx?.profile

  return (
    <div className="min-h-screen bg-surface selection:bg-secondary-container selection:text-on-secondary-container">
      <Sidebar role={role} profile={profile} />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Navbar role={role} profile={profile} />
        <main className="pt-24 pb-12 px-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

import { ComingSoon } from '@/components/ui/ComingSoon'

export default function AdminSettingsPage() {
  return (
    <ComingSoon 
      title="Paramètres Système" 
      description="Configuration globale de la plateforme, gestion des clés API et options de sécurité avancées."
      backHref="/dashboard/admin"
    />
  )
}

import { requireRole } from '@/lib/auth'
import PaymentsClientPage from './PaymentsClientPage'
import { getFinancialSummary, getTransactions } from '@/features/payments/services/paymentService'

export default async function PaymentsPage() {
  // Secure route server-side for students only
  await requireRole(['student'])

  // Fetch real data
  const [summary, transactions] = await Promise.all([
    getFinancialSummary(),
    getTransactions()
  ])

  return (
    <PaymentsClientPage 
      initialSummary={summary} 
      initialTransactions={transactions} 
    />
  )
}

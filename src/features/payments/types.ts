export type TransactionStatus = 'paid' | 'pending' | 'failed'
export type PaymentMode = 'credit_card' | 'transfer' | 'mobile_money' | 'cash'

export interface Transaction {
  id: string
  reference: string
  designation: string
  category: string
  date: string
  mode: PaymentMode
  amount: number
  currency: string
  status: TransactionStatus
  invoiceUrl?: string
}

export interface FinancialSummary {
  userId: string
  remainingBalance: number
  totalPaid: number
  pendingFees: number
  paymentPlan: string
  progressPercentage: number
  nextDeadline: string
  currency: string
}

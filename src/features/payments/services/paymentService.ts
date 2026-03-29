import { createClient } from '@/lib/supabase/server'
import { Transaction, FinancialSummary } from '../types'

export async function getFinancialSummary() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('financial_summaries')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    console.warn('Error fetching financial summary:', error)
    return null
  }

  return data as FinancialSummary
}

export async function getTransactions() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })

  if (error) {
    console.warn('Error fetching transactions:', error)
    return []
  }

  return data as Transaction[]
}

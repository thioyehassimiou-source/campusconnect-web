'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/Button'

export function SubmitButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const { pending } = useFormStatus()
  
  return (
    <Button 
      type="submit"
      isLoading={pending}
      className={className}
    >
      {children}
    </Button>
  )
}

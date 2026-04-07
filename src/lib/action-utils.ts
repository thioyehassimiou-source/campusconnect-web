import { z } from 'zod'

export type ActionState<T> = {
  success: boolean
  data?: T
  error?: string
  fieldErrors?: Record<string, string[]>
}

export function createSafeAction<T extends z.ZodTypeAny, R>(
  schema: T,
  handler: (data: z.infer<T>) => Promise<R>
) {
  return async (input: unknown): Promise<ActionState<R>> => {
    const result = schema.safeParse(input)

    if (!result.success) {
      return {
        success: false,
        fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>
      }
    }

    try {
      const data = await handler(result.data)
      return {
        success: true,
        data
      }
    } catch (error) {
      console.error('Action error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Une erreur inattendue est survenue'
      }
    }
  }
}

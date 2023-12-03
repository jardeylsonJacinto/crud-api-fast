import { z } from 'zod'
export const missingParamError = (error: z.ZodError) => {
  const errorMessages = error.errors.map((err) => err.message)
  return { error: 'Dados invalidos', details: errorMessages }
}

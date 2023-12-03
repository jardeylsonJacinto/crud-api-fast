import { z } from 'zod'
export const userValidation = z.object({
  name: z.string({
    required_error: 'Precisa adicionar um nome',
    invalid_type_error: 'O nome não pode ser um numero',
  }),
  email: z.string().email({ message: 'E-mail invalido' }),
  password: z
    .string()
    .min(6, { message: 'A senha não pode ter menos que 6 caracteres' }),
})

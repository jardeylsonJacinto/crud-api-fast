import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../shared/lib/prisma'
import { missingParamError } from '../../../shared/errors/missing-param-error'

export const Store = async (req: FastifyRequest, reply: FastifyReply) => {
  const bodySchema = z.object({
    name: z.string({
      required_error: 'Precisa adicionar um nome',
      invalid_type_error: 'O nome não pode ser um numero',
    }),
    email: z.string().email({ message: 'E-mail invalido' }),
    password: z
      .string()
      .min(6, { message: 'A senha não pode ter menos que 6 caracteres' }),
  })

  try {
    const { name, email, password } = bodySchema.parse(req.body)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
    return reply.status(200).send(user)
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return missingParamError(error)
    }
    return reply.status(500).send({ error: 'Erro interno do servidor' })
  }
}

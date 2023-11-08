import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { missingParamError } from '../../shared/errors/missing-param-error'

export const Store = async (req: FastifyRequest, reply: FastifyReply) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
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

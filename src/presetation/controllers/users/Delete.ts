import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../infra/database/prisma'
import { z } from 'zod'

export const Delete = async (req: FastifyRequest, reply: FastifyReply) => {
  const bodySchema = z.object({
    email: z.string().email({ message: 'E-mail invalido' }),
  })
  const { email } = bodySchema.parse(req.body)
  const users = await prisma.user.delete({
    where: {
      email,
    },
  })
  reply.send(users)
}

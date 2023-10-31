import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export const store = async (req: FastifyRequest, reply: FastifyReply) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })
  const { name, email, password } = bodySchema.parse(req.body)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
  return reply.status(200).send(user)
}

export const index = async (req: FastifyRequest, reply: FastifyReply) => {
  const users = await prisma.user.findMany()
  reply.send(users)
}

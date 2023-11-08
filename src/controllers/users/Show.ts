import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../lib/prisma'

export const Show = async (req: FastifyRequest, reply: FastifyReply) => {
  const users = await prisma.user.findMany()
  reply.send(users)
}

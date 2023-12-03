import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../infra/database/prisma'

export const Show = async (req: FastifyRequest, reply: FastifyReply) => {
  const users = await prisma.user.findMany()
  reply.send(users)
}

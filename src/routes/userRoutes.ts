import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function userRoutes(app: FastifyInstance) {
  app.get('/users', async (req, reply) => {
    const users = await prisma.user.findMany()
    reply.send(users)
  })
}

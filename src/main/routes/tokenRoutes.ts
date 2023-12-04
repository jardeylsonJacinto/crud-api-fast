import { FastifyInstance } from 'fastify'
import { TokenController } from '../../presetation/controllers'

export async function tokenRoutes(app: FastifyInstance) {
  app.post('/token', TokenController.Store)
}

import { FastifyInstance } from 'fastify'
import { UserController } from '../controllers'

export async function userRoutes(app: FastifyInstance) {
  app.get('/users', UserController.Show)
  app.post('/users', UserController.Store)
}

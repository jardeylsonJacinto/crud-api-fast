import { FastifyInstance } from 'fastify'
import { store, index } from '../controllers/users/userController'

export async function userRoutes(app: FastifyInstance) {
  app.get('/users', index)

  app.post('/users', store)
}

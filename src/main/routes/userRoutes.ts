import { FastifyInstance } from 'fastify'
import { UserController } from '../../presetation/controllers'
import { authorization } from '../middlewares/loginRequired'

export async function userRoutes(app: FastifyInstance) {
  app.get('/users', { preHandler: authorization }, UserController.Show)
  app.post('/users', UserController.Store)
  app.delete('/users', { preHandler: authorization }, UserController.Delete)
}

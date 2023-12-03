import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { userRoutes } from './routes/userRoutes'

const app = fastify()

app.register(cors)
app.register(userRoutes)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server running!')
})

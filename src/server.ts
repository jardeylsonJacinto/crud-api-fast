import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { todoRoutes } from './routes/todoRoutes'
import { userRoutes } from './routes/userRoutes'

const app = fastify()

app.register(cors)
app.register(todoRoutes)
app.register(userRoutes)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server running!')
})

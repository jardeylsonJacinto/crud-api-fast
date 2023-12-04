import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { routes } from './routes/index'
import dotenv from 'dotenv'

dotenv.config()
const app = fastify()

app.register(cors)
app.register(routes.tokenRoutes)
app.register(routes.userRoutes)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server running!')
})

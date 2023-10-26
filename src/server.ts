import { fastify } from 'fastify'
import { todoRoutes } from './routes/todoRoutes'
import { userRoutes } from './routes/userRoutes'

const app = fastify()

app.register(todoRoutes)
app.register(userRoutes)

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error()
    process.exit(1)
  }
  console.log(`Serve listening on ${address}`)
})

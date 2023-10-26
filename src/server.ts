import { fastify } from 'fastify'

const app = fastify()

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error()
    process.exit(1)
  }
  console.log(`Serve listening on ${address}`)
})

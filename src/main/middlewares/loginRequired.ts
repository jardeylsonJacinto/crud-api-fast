import { FastifyReply, FastifyRequest } from 'fastify'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { prisma } from '../../infra/database/prisma'

export const authorization = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { authorization } = req.headers
  const secretKey: string | undefined = process.env.SECRET_KEY

  console.log(authorization)
  if (!authorization) {
    return reply.status(401).send({ error: 'Unauthorized! Login required' })
  }

  let token: string = ''

  if (typeof authorization === 'string') {
    // eslint-disable-next-line prettier/prettier
    [, token] = authorization.split(' ')
  }

  try {
    const decoded = jwt.verify(token, secretKey as Secret) as JwtPayload
    const { id, email } = decoded
    const user = await prisma.user.findUnique({
      where: {
        id,
        email,
      },
    })
    if (!user) {
      throw new Error('User not found')
    }
    req = id
    req = email
  } catch (err) {
    return reply
      .status(401)
      .send({ errors: ['Unauthorized! Token expirado ou inválido'] })
  }
}

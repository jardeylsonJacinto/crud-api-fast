import { FastifyReply, FastifyRequest } from 'fastify'
import { tokenValidation } from '../../validation/userValidation'
import { prisma } from '../../../infra/database/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secretKey: string | undefined = process.env.SECRET_KEY
if (!secretKey) {
  throw new Error('Chave secreta não definida')
}

export const Store = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email = '', password = '' } = tokenValidation.parse(req.body)

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return reply.status(401).send({
      message: 'User not found',
    })
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    return reply.status(401).send({
      errors: ['Invalid password'],
    })
  }

  const { id } = user
  const token = jwt.sign({ id, email }, secretKey, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  })

  return reply.send({ token })
}

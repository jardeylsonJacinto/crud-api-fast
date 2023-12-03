import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../infra/database/prisma'
import { missingParamError } from '../../errors/missing-param-error'
import bcrypt from 'bcrypt'
import { userValidation } from '../../validation/userValidation'

export const Store = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { name, email, password } = userValidation.parse(req.body)
    const hashdPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashdPassword,
      },
    })
    return reply.status(200).send(user)
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return missingParamError(error)
    }
    return reply.status(500).send({ error: 'Erro interno do servidor' })
  }
}

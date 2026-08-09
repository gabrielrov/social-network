import { Request, Response } from 'express'
import { loginSchema, registerSchema } from '@/modules/auth/auth.schema'
import * as authService from '@/modules/auth/auth.service'

export function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body)

  // TODO: service function

  res.send(data)
}

export async function register(req: Request, res: Response) {
  const data = registerSchema.parse(req.body)
  await authService.register(data)

  res.sendStatus(201)
}

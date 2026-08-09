import { Request, Response } from 'express'
import { loginSchema, registerSchema } from '@/modules/auth/auth.schema'

export function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body)

  // TODO: service function

  res.send(data)
}

export function register(req: Request, res: Response) {
  const data = registerSchema.parse(req.body)

  res.send(data)
}

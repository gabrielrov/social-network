import { Request, Response } from 'express'
import { loginSchema } from '@/modules/auth/auth.schema'

export function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body)

  // TODO: service function

  res.send(data)
}

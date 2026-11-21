import { Request, Response } from 'express'
import { loginSchema, registerSchema } from '@repo/contracts/auth/schema'
import * as authService from '@/modules/auth/auth.service'
import { guestLogin } from '@/config/guesUser'

export async function login(req: Request, res: Response): Promise<void> {
  const data = loginSchema.parse(req.body)
  const token = await authService.login(data)

  res.json({ token })
}

export async function loginAsGuest(_: Request, res: Response): Promise<void> {
  const data = { username: guestLogin.username, password: guestLogin.password }
  const token = await authService.login(data)

  res.json({ token })
}

export async function register(req: Request, res: Response): Promise<void> {
  const data = registerSchema.parse(req.body)
  await authService.register(data)

  res.sendStatus(201)
}

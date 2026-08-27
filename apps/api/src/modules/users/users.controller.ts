import { User } from '@/generated/prisma/client'
import { Request, Response } from 'express'

export async function getCurrent(req: Request, res: Response): Promise<void> {
  const { passwordHash, ...user } = req.user as User

  res.json(user)
}

import { User } from '@/generated/prisma/client'
import { findByUsername } from '@/modules/users/users.repository'
import { toUserDTO } from '@/utils/DTOConvertion'
import { Request, Response } from 'express'

export async function getUserByToken(
  req: Request,
  res: Response,
): Promise<void> {
  const user = req.user as User

  const userDTO = toUserDTO(user)
  res.json(userDTO)
}

export async function getUserByUsername(
  req: Request<{ username: string }>,
  res: Response,
): Promise<void> {
  const { username } = req.params
  const user = await findByUsername(username)

  if (!user) {
    res.status(404).json({
      message: 'User not found',
    })
    return
  }

  const userDTO = toUserDTO(user)
  res.json(userDTO)
}

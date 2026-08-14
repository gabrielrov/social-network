import { LoginDTO, RegisterDTO } from '@/modules/auth/auth.schema'
import { createUser, findByUsername } from '@/modules/users/users.repository'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import env from '@/config/env'
import { ConflictError, UnauthorizedError } from '@/errors'

export async function login(data: LoginDTO): Promise<string> {
  const user = await findByUsername(data.username)

  if (!user) throw new UnauthorizedError('User not found')

  const isValidPassword = await bcrypt.compare(data.password, user.passwordHash)
  if (!isValidPassword) throw new UnauthorizedError('Invalid password')

  const token = jwt.sign({ sub: user.id }, env.jwtSecret, { expiresIn: '2d' })

  return token
}

export async function register(data: RegisterDTO): Promise<void> {
  const userFound = await findByUsername(data.username)

  if (userFound) throw new ConflictError('User already exists')

  await createUser({
    username: data.username,
    firstName: data.firstName,
    surname: data.surname,
    passwordHash: await bcrypt.hash(data.password, 10),
  })
}

import { registerDTO } from '@/modules/auth/auth.schema'
import { createUser, findByUsername } from '@/modules/users/users.repository'
import bcrypt from 'bcryptjs'

export async function register(data: registerDTO) {
  const userFound = await findByUsername(data.username)

  if (userFound) throw new Error('User already exists') // TODO: create custom error 409

  await createUser({
    username: data.username,
    firstName: data.firstName,
    surname: data.surname,
    passwordHash: await bcrypt.hash(data.password, 10),
  })
}

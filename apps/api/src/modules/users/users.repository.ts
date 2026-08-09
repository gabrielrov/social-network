import { Prisma, User } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'

export async function findById(id: User['id']): Promise<User | null> {
  return await prisma.user.findUnique({ where: { id } })
}

export async function findByUsername(
  username: User['username'],
): Promise<User | null> {
  return await prisma.user.findUnique({ where: { username } })
}

export async function createUser(
  user: Prisma.UserCreateInput,
): Promise<User | null> {
  return await prisma.user.create({ data: user })
}

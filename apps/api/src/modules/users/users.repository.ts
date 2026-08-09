import { Prisma, User } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'

export async function findById(id: User['id']) {
  return await prisma.user.findUnique({ where: { id } })
}

export async function findByUsername(username: User['username']) {
  return await prisma.user.findUnique({ where: { username } })
}

export async function createUser(user: Prisma.UserCreateInput) {
  return await prisma.user.create({ data: user })
}

import { guestLogin } from '@/config/guesUser'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function seedUsers(): Promise<void> {
  const passwordHash = await bcrypt.hash(guestLogin.password, 10)

  await prisma.user.upsert({
    where: {
      username: 'guest',
    },
    update: {},
    create: {
      username: guestLogin.username,
      firstName: 'Guest',
      surname: 'User',
      role: 'GUEST',
      passwordHash,
    },
  })
}

await seedUsers()

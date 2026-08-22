import { envWrapper } from '@/config/env'
import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: envWrapper.databaseURL }),
})

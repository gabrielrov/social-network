import { User } from '@/generated/prisma/client'
import { UserDTO } from '@repo/contracts/user/types'

export function toUserDTO(user: User): UserDTO {
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    surname: user.surname,
    createdAt: user.createdAt,
    role: user.role,
  }
}

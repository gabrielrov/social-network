export interface UserDTO {
  id: string
  username: string
  firstName: string
  surname: string
  role: 'GUEST' | 'USER'
  createdAt: Date
}

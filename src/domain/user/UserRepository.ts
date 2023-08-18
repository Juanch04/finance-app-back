import { type User } from '@prisma/client'

interface UserRepository {
  findAll: () => Promise<User[]>
  findByEmail: (email: string) => Promise<User | null>
  create: (data: User) => Promise<User>
}

export default UserRepository

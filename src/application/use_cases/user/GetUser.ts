import { type User } from '@prisma/client'
import type serviceLocator from '@infrastructure/config/service-locator'

async function GetUser(
  email: string,
  { user: userRepository }: typeof serviceLocator.repositories
): Promise<User | null> {
  return await userRepository.findByEmail(email)
}

export default GetUser

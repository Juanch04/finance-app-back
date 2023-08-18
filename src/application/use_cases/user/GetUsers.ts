import { type User } from '@prisma/client'
import type serviceLocator from '@infrastructure/config/service-locator'

async function GetUsers({
  user: userRepository
}: typeof serviceLocator.repositories): Promise<User[]> {
  return await userRepository.findAll()
}

export default GetUsers

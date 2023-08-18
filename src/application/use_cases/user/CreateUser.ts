import bcrypt from 'bcrypt'
import User from '@domain/user/User'
import { type User as UserType } from '@prisma/client'
import type serviceLocator from '@infrastructure/config/service-locator'

async function CreateUser(
  data: UserType,
  { user: userRepository }: typeof serviceLocator.repositories
): Promise<UserType> {
  const userExist = await userRepository.findByEmail(data.email)

  if (userExist != null) throw new Error('User already exists')

  const user = new User({
    ...data,
    password: bcrypt.hashSync(data.password, bcrypt.genSaltSync())
  })

  return await userRepository.create(user)
}

export default CreateUser

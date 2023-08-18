import type User from '@domain/user/User'
import type serviceLocator from '@infrastructure/config/service-locator'
import { type TokenUser } from '@infrastructure/server/types'

async function ValidateToken(
  token: string,
  { security, repositories }: typeof serviceLocator
): Promise<User> {
  if (token.length === 0 || token === null) throw new Error('INVALID_TOKEN')

  let tokenInfo

  try {
    tokenInfo = security.jwt.decode(token) as TokenUser
  } catch (error) {
    throw new Error('INVALID_TOKEN')
  }

  const user = await repositories.user.findByEmail(tokenInfo.email)

  if (user === null) throw new Error('INVALID_USER')

  return user
}

export default ValidateToken

import type User from '@domain/user/User'
import type serviceLocator from '@infrastructure/config/service-locator'

type ServiceLocator = typeof serviceLocator

interface ContextGraphql extends ServiceLocator {
  checkAuth: (requiredAuth: boolean) => { user: User, token: string }
}

interface TokenUser
  extends Pick<User, 'name' | 'surname' | 'username' | 'email'> {
  iat: number
  exp: number
}

export type { ContextGraphql, TokenUser }

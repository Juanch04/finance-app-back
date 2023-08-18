import bcrypt from 'bcrypt'
import type serviceLocator from '@infrastructure/config/service-locator'

async function Login(
  email: string,
  password: string,
  { repositories, security }: typeof serviceLocator
): Promise<{ token: string }> {
  const user = await repositories.user.findByEmail(email)

  if (user === null || !bcrypt.compareSync(password, user.password)) {
    throw new Error('INVALID_CREDENTIALS')
  }

  const { name, surname, username } = user
  return { token: security.jwt.encode({ name, surname, username, email }) }
}

export default Login

import DebtRepositorySQLite from '@infrastructure/repositories/sqlite/debt.repository'
import UserRepositorySQLite from '@infrastructure/repositories/sqlite/user.repository'
import JSONWebTokenManager from '@infrastructure/security/jwt'

function buildBeans(): {
  repositories: {
    user: UserRepositorySQLite
    debt: DebtRepositorySQLite
  }
  security: { jwt: JSONWebTokenManager }
} {
  const beans = {
    repositories: {
      user: new UserRepositorySQLite(),
      debt: new DebtRepositorySQLite()
    },
    security: {
      jwt: new JSONWebTokenManager()
    }
  }

  return beans
}

export = buildBeans()

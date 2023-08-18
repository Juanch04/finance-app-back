import gql from 'graphql-tag'
import { type User } from '@prisma/client'
import { Login } from '@application/use_cases/auth'
import type { ContextGraphql } from '@infrastructure/server/types'

export const typeDef = gql`
  type Mutation {
    "Login"
    login(email: String!, password: String!): Auth
  }

  type Auth {
    token: String
  }
`

export const resolvers = {
  Mutation: {
    login: async (_: any, { email, password }: User, beans: ContextGraphql) => {
      return await Login(email, password, { ...beans })
    }
  }
}

import gql from 'graphql-tag'
import { type Debt } from '@prisma/client'
import { CreateDebt, GetMyDebts } from '@application/use_cases/debt'
import type { ContextGraphql } from '@infrastructure/server/types'

export const typeDef = gql`
  type Query {
    getMyDebts: [Debt]
  }

  type Mutation {
    "CreateDebt"
    createDebt(description: String!, debtorId: ID!, amount: Int!): Debt
  }

  type Debt {
    id: ID!
    creditorId: ID!
    debtorId: ID!
    description: String
    amount: Int
    active: Boolean
    createdAt: String
    updatedAt: String
  }
`

export const resolvers = {
  Query: {
    getMyDebts: async (
      _a: any,
      _b: any,
      { checkAuth, repositories }: ContextGraphql
    ) => {
      const { user } = checkAuth(true)
      return await GetMyDebts(user.id, { ...repositories })
    }
  },
  Mutation: {
    createDebt: async (
      _: any,
      debt: Debt,
      { repositories, checkAuth }: ContextGraphql
    ) => {
      const { user } = checkAuth(true)
      return await CreateDebt(debt, user, { ...repositories })
    }
  }
}

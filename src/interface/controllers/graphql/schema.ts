import gql from 'graphql-tag'
import { resolvers as userResolvers, typeDef as userTypeDef } from './user'
import { resolvers as authResolvers, typeDef as authTypeDef } from './auth'
import { resolvers as debtResolvers, typeDef as debtTypeDef } from './debt'

const rootTypesDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`

export const resolvers = [userResolvers, authResolvers, debtResolvers]

export const typeDefs = [rootTypesDefs, userTypeDef, authTypeDef, debtTypeDef]

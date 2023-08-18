import gql from 'graphql-tag'
import { type User } from '@prisma/client'
import { CreateUser, GetUser, GetUsers } from '@application/use_cases/user'
import type { ContextGraphql } from '@infrastructure/server/types'

export const typeDef = gql`
  type Query {
    "Get all users"
    getUsers: [User]
    "Get specific user by email"
    getUser(email: String!): User
  }

  type Mutation {
    createUser(
      name: String!
      surname: String!
      username: String!
      email: String!
      password: String!
      image: String
    ): User
  }

  type User {
    "ID"
    id: ID!
    "Name User"
    name: String
    "Surname User"
    surname: String
    "Alias User"
    username: String
    "Avatar"
    image: String
    "Email User"
    email: String
    "Password User"
    password: String
    "Status User"
    active: Boolean
    createdAt: String
    updatedAt: String
  }
`

export const resolvers = {
  Query: {
    getUser: async (
      _a: any,
      { email }: User,
      { repositories, checkAuth }: ContextGraphql
    ) => {
      checkAuth(true)
      return await GetUser(email, { ...repositories })
    },
    getUsers: async (
      _a: any,
      _b: any,
      { repositories, checkAuth }: ContextGraphql
    ) => {
      checkAuth(true)
      return await GetUsers({ ...repositories })
    }
  },
  Mutation: {
    createUser: async (
      _: any,
      user: User,
      { repositories }: ContextGraphql
    ) => {
      return await CreateUser(user, { ...repositories })
    }
  }
}

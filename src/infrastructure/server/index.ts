import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import type { Server, IncomingMessage, ServerResponse } from 'http'

// Infrastructure
import { resolvers, typeDefs } from '@interface/controllers/graphql/schema'
import env from '@infrastructure/config/environment'
import serviceLocator from '@infrastructure/config/service-locator'

import { ValidateToken } from '@application/use_cases/auth'
import type User from '@domain/user/User'
import { type ContextGraphql } from './types'

export class ExpressServer {
  private readonly app

  private readonly server

  constructor() {
    this.app = express()
    this.server = new ApolloServer<ContextGraphql>({
      typeDefs,
      resolvers
    })
    this.middleware()
    void this.graphqlServer()
  }

  private middleware(): void {
    this.app.use(helmet({ contentSecurityPolicy: false }))
    this.app.use(cors())
    this.app.use(express.json())
  }

  private async graphqlServer(): Promise<void> {
    await this.server.start()
    this.app.use(
      '/graphql',
      expressMiddleware(this.server, {
        context: async ({ req }) => {
          const token = req.headers.authorization ?? ''

          let user: User
          try {
            user = await ValidateToken(token, { ...serviceLocator })
          } catch (error) {}

          return {
            ...serviceLocator,
            checkAuth: (requiredAuth: boolean) => {
              if (requiredAuth && user === undefined) {
                throw new Error('Authentication failed')
              }
              return { user, token }
            }
          }
        }
      })
    )
  }

  public listen(): Server<typeof IncomingMessage, typeof ServerResponse> {
    return this.app.listen(env.port, () => {
      // console.log(
      //   '\x1b[32m',
      //   `🚀 API Serve:        ==> http://localhost:${env.port}/api/v1`
      // )

      console.log(
        '\x1b[35m',
        `🚀 Apollo Serve:     ==> http://localhost:${env.port}/graphql`,
        '\x1b[0m'
      )
    })
  }
}

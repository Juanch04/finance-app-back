import dotenv from 'dotenv'
import prisma from '@infrastructure/orm/prisma'

dotenv.config()

export default {
  async init(): Promise<void> {
    try {
      await prisma.$connect()
      console.log(
        '\x1b[32m',
        '💾 Connection to DB has been established successfully.'
      )
    } catch (err) {
      console.error('Unable to connect to the database:', err)
    }
  }
}

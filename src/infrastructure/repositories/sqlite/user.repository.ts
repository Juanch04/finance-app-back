import { type User } from '@prisma/client'
import prisma from '@infrastructure/orm/prisma'
import type UserRepository from '@domain/user/UserRepository'

class UserRepositorySQLite implements UserRepository {
  private readonly model

  constructor() {
    this.model = prisma.user
  }

  async create(data: User): Promise<User> {
    return await this.model.create({ data })
  }

  async findAll(): Promise<User[]> {
    return await this.model.findMany({ where: { active: true } })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.model.findUnique({ where: { email, active: true } })
  }
}

export default UserRepositorySQLite

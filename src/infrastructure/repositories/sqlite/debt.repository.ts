import type DebtRepository from '@domain/debt/DebtRepository'
import prisma from '@infrastructure/orm/prisma'
import { type Debt } from '@prisma/client'

class DebtRepositorySQLite implements DebtRepository {
  private readonly model
  constructor() {
    this.model = prisma.debt
  }

  public async create(data: Debt): Promise<Debt> {
    return await this.model.create({ data })
  }

  public async find(id: string): Promise<Debt | null> {
    return await this.model.findUnique({ where: { id, active: true } })
  }

  public async findMyDebs(debtorId: string): Promise<Debt[]> {
    return await this.model.findMany({ where: { debtorId, active: true } })
  }
}

export default DebtRepositorySQLite

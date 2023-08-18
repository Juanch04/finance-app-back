import { type Debt } from '@prisma/client'

interface DebtRepository {
  create?: (debt: Debt) => Promise<Debt>
  find?: (id: string) => Promise<Debt | null>
  findAll?: () => Promise<Debt[]>
  findMyDebs?: (debtorId: string) => Promise<Debt[]>
}

export default DebtRepository

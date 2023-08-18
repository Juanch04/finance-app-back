import { type User, type Debt, Prisma } from '@prisma/client'
import type serviceLocator from '@infrastructure/config/service-locator'

async function CreateDebt(
  data: Debt,
  user: User,
  { debt: debtRepository }: typeof serviceLocator.repositories
): Promise<Debt> {
  return await debtRepository.create({
    ...data,
    creditorId: user.id,
    amount: new Prisma.Decimal(data.amount)
  })
}

export default CreateDebt

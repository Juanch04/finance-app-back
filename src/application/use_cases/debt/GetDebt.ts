import { type Debt } from '@prisma/client'
import type serviceLocator from '@infrastructure/config/service-locator'

async function GetDebt(
  id: string,
  { debt: debtRepository }: typeof serviceLocator.repositories
): Promise<Debt | null> {
  return await debtRepository.find(id)
}

export default GetDebt

import { type Debt } from '@prisma/client'
import type serviceLocator from '@infrastructure/config/service-locator'

async function GetMyDebts(
  idUser: string,
  { debt: debtRepository }: typeof serviceLocator.repositories
): Promise<Debt[]> {
  return await debtRepository.findMyDebs(idUser)
}

export default GetMyDebts

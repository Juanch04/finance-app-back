import bcrypt from 'bcrypt'
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  const juancho = await prisma.user.upsert({
    where: { email: 'juancho@mail.com' },
    update: {},
    create: {
      email: 'juancho@mail.com',
      name: 'Juan',
      surname: 'Cardenas',
      username: 'Juancho',
      password: bcrypt.hashSync('juancho', bcrypt.genSaltSync())
    }
  })

  const zucer = await prisma.user.upsert({
    where: { email: 'zucer@mail.com' },
    update: {},
    create: {
      email: 'zucer@mail.com',
      name: 'Julian',
      surname: 'Sucerquia',
      username: 'Zucer',
      password: bcrypt.hashSync('zucer', bcrypt.genSaltSync())
    }
  })

  await prisma.debt.create({
    data: {
      debtorId: zucer.id,
      creditorId: juancho.id,
      amount: new Prisma.Decimal(500000),
      description: 'Préstamo del alquiler'
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

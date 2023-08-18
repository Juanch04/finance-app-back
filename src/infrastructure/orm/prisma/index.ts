import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query'
    }
  ]
})

prisma.$on('query', ({ query, params }) => {
  console.log('\n\x1b[36m', '🔎 query:', query)
  console.log('params:', params, '\x1b[0m')
})

export default prisma

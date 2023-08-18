import bootstrap from '@infrastructure/config/bootstrap'
import { ExpressServer } from '@infrastructure/server'

const main = async (): Promise<void> => {
  try {
    await bootstrap.init()
    const server = new ExpressServer()
    server.listen()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

void main()

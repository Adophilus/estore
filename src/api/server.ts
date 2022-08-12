import ProductApiController from './controllers/Product.js'
import { Server } from '@overnightjs/core'
import { config } from 'dotenv'
import PocketBase from 'pocketbase'
import { Logger } from 'tslog'

class EStoreServer extends Server {
  private readonly SERVER_START_MSG = 'Server running on port: '
  private logger: Logger
  private pocketBaseClient: PocketBase

  constructor() {
    super()
    this.setupConfig()
    this.setupMiddleWare()
    super.addControllers(new ProductApiController())
    this.errorPages()
  }

  public setupConfig() {
    this.logger = new Logger({ name: 'EStore' })
    this.pocketBaseClient = new PocketBase(process.env.POCKETBASE_HOST)
  }

  public setupMiddleWare() {
    this.app.use((req, res, next) => {
      res.locals.pocketBaseClient = this.pocketBaseClient
      res.locals.logger = this.logger
      next()
    })
  }

  public start(port: number) {
    this.app.listen(port, () => {
      this.logger.info(this.SERVER_START_MSG + String(port))
    })
  }

  public errorPages() {
    this.app.use((req, res) =>
      res.status(404).json({ error: 'Route not found!' })
    )
  }
}

config()

new EStoreServer().start(parseInt(process.env.PORT))

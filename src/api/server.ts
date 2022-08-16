import ProductApiController from './controllers/Product.js'
import { Server } from '@overnightjs/core'
import cors from 'cors'
import * as dotenv from 'dotenv'
import PocketBase from 'pocketbase'
import { Logger } from 'tslog'

export default class EStoreServer extends Server {
  private readonly SERVER_START_MSG = 'Server running on port: '
  private logger: Logger
  private pocketBase: PocketBase

  constructor() {
    super()
    this.setupConfig()
    this.setupMiddleWare()
    super.addControllers(new ProductApiController({ logger: this.logger }))
    this.errorPages()
  }

  public setupConfig() {
    this.logger = new Logger({ name: 'EStore' })
    this.pocketBase = new PocketBase(process.env.POCKETBASE_URL)
    const adminCreds = process.env.POCKETBASE_ADMIN.split(':')

    this.pocketBase.Admins.authViaEmail(adminCreds[0], adminCreds[1])
  }

  public setupMiddleWare() {
    this.app.use(cors())
    this.app.use((req, res, next) => {
      res.locals.pocketBase = this.pocketBase
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

dotenv.config()

new EStoreServer().start(parseInt(process.env.SERVER_PORT))

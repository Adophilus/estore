
import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Logger } from 'tslog'
import SaleScheduler from '../utils/SaleScheduler.js'

@Controller('api/sale')
export default class {
  logger: Logger

  constructor({ logger }) {
    this.logger = logger.getChildLogger({ name: 'ProductShareAPI' })
    this.saleScheduler = new SaleScheduler({ pocketBase, logger })
  }

  @Put()
  private async createSale(req: Request, res: Response) {
    try {
      const sale = await res.locals.pocketBase.Records.create('sales', req.params)
      this.saleScheduler.add(sale)
      return res.status(StatusCodes.CREATED).send({ message: ReasonPhrases.CREATED})
    }
    catch (err) {
      this.logger.error(err)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  }
}

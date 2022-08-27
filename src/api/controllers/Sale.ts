import { Controller, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Logger } from 'tslog'
import SaleScheduler from '../utils/SaleScheduler.js'

@Controller('api/sales')
export default class {
  logger
  saleScheduler
  pocketBase

  constructor({ logger, pocketBase }) {
    this.logger = logger.getChildLogger({ name: 'ProductShareAPI' })
    this.pocketBase = pocketBase
    this.saleScheduler = new SaleScheduler({ pocketBase, logger })
  }

  @Post()
  private async createSale(req: Request, res: Response) {
    this.logger.info(req.body)
    this.logger.info(req.params)
    this.logger.info(req.query)
    try {
      const sale = await this.pocketBase.Records.create('sales', req.body)
      this.saleScheduler.add(sale)
      return res.status(StatusCodes.CREATED).send({ message: ReasonPhrases.CREATED})
    }
    catch (err) {
      this.logger.error(err)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  }
}

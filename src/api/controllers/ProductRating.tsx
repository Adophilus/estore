import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Logger } from 'tslog'

@Controller('api/products/rating')
export default class {
  logger
  pocketBase

  constructor({ pocketBase, logger }) {
    this.logger = logger.getChildLogger({ name: 'ProductAnalyticsAPI' })
    this.pocketBase = pocketBase
  }

 
  @Put(':id')
  private async createProductRating (req: Request, res: Response) {
    const { id: productId } = req.params
    try {
      const product = await this.pocketBase.Records.get(productId, { expand: 'stats'})
      const reviews = product
      await this.pocketBase.update('product_stats', product.stats, { reviews })
    }
  }
}

import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Logger } from 'tslog'

@Controller('api/products/analytics')
export default class {
  logger
  pocketBase

  constructor({ pocketBase, logger }) {
    this.logger = logger.getChildLogger({ name: 'ProductAnalyticsAPI' })
    this.pocketBase = pocketBase
  }

  @Get(':id')
  private async getProduct(req: Request, res: Response) {
    const { id: productId } = req.params
    try {
      const product = await this.pocketBase.Records.getOne(
        'products',
        productId,
        { expand: 'stats' }
      )

      await this.pocketBase.Records.update('product_stats', product['@expand'].stats.id, {
        trending: product['@expand'].stats.trending + 1,
        views: product['@expand'].stats.views + 1,
      })

      return res.status(StatusCodes.OK).send(ReasonPhrases.OK)
    }
    catch (err) {
      this.logger.error(err)
    }
  }
}

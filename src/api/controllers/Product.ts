import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Logger } from 'tslog'

@Controller('api/products/analytics')
export default class {
  logger: Logger

  constructor ({ logger }) {
    this.logger = logger.getChildLogger({ name: "ProductAPI" })
  }

  @Get(':id')
  private async getProduct(req: Request, res: Response) {
    const { id: productId } = req.params
    try {
      const product = await res.locals.pocketBase.Records.getOne(
        'products',
        productId,
        { expand: 'stats' }
      )

      if (
        product.onSale &&
        Date.now() <
          product['@expand'].stats.sale.started +
            product['@expand'].stats.sale.duration * 1000
      ) {
        this.logger.info(
          `Product(id=${productId}) sale is currently going on!`
        )
        return res.status(StatusCodes.OK).end()
      }

      if (
        product['@expand'].stats.sale.counter <
        product['@expand'].stats.sale.limit
      ) {
        product['@expand'].stats.sale.counter++
        product.onSale = false
        this.logger.info(`updating counter of Product(id=${productId})`)
        await res.locals.pocketBase.Records.update(
          'products',
          productId,
          product
        )
        await res.locals.pocketBase.Records.update(
          'product_stats',
          product['@expand'].stats.id,
          product['@expand'].stats
        )
        return res.status(StatusCodes.OK).end()
      }

      product.onSale = true
      product['@expand'].stats.sale.counter = 0
      product['@expand'].stats.sale.started = Date.now()
      this.logger.info(
        `setting random discount for Product(id=${productId})`
      )
      product['@expand'].stats.discount.active = Math.floor(
        Math.random() *
          (product['@expand'].stats.discount.max -
            product['@expand'].stats.discount.min +
            1) +
          product['@expand'].stats.discount.min
      )

      this.logger.info(
        `setting discount of ${product['@expand'].stats.discount.active}% on Product(id=${productId})`
      )
      await res.locals.pocketBase.Records.update('products', productId, product)
      await res.locals.pocketBase.Records.update(
        'product_stats',
        product['@expand'].stats.id,
        product['@expand'].stats
      )
      return res.status(StatusCodes.OK).end()
    } catch (err) {
      this.logger.error(err)
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
  }
}

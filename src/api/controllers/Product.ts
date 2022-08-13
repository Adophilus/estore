import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

@Controller('api/products/analytics')
export default class {
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
            product['@expand'].stats.sale.duration
      ) {
        res.locals.logger.info(
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
        res.locals.logger.info(`updating counter of Product(id=${productId})`)
        return res.status(StatusCodes.OK).end()
      }

      product.onSale = true
      product['@expand'].stats.sale.counter = 0
      product['@expand'].stats.sale.started = Date.now()
      product['@expand'].stats.discount.active = Math.floor(
        Math.random() *
          (product['@expand'].stats.discount.max -
            product['@expand'].stats.discount.min +
            1) +
          product['@expand'].stats.discount.min
      )

      res.locals.logger.info(
        `setting random discount for Product(id=${productId})`
      )
      await res.locals.pocketBase.Records.update('products', productId, product)
      await res.locals.pocketBase.Records.update(
        'product_stats',
        product['@expand'].stats.id,
        product['@expand'].stats
      )
      return res.status(StatusCodes.OK).end()
    } catch (err) {
      res.locals.logger.error(err)
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
  }
}

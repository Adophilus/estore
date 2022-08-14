import chai from 'chai'
import chaiHttp from 'chai-http'
import * as dotenv from 'dotenv'
import PocketBase from 'pocketbase'
import { describe, expect, test } from 'vitest'

dotenv.config()
chai.use(chaiHttp)

const agent: any = chai.request(process.env.SERVER_BASE_URL)
const pocketBase = new PocketBase(process.env.POCKETBASE_URL)
const productId = 'lXXj5zaToEaSzL3'
let product = await pocketBase.Records.getOne('products', productId, {
  expand: 'stats'
})

describe('PRODUCT ANALYTICS', () => {
  test("check that a product's sale counter is incremented", async () => {
    let productStats

    for (
      let i = product['@expand'].stats.sale.counter;
      i <= product['@expand'].stats.sale.limit;
      i++
    ) {
      const res = await agent.get(`/api/products/analytics/${productId}`)
      expect(res.status).to.equal(200)
    }

    productStats = await pocketBase.Records.getOne(
      'product_stats',
      product.stats
    )
    expect(productStats.sale.counter).to.equal(0)
  })

  test(
    "check that the product is removed from 'sale'",
    () => {
      return new Promise((resolve) =>
        setTimeout(async () => {
          await agent.get(`/api/products/analytics/${productId}`)
          const _product = await pocketBase.Records.getOne(
            'products',
            productId,
            {
              expand: 'stats'
            }
          )
          expect(_product.onSale).toBeFalsy()
          resolve()
        }, product['@expand'].stats.sale.duration * 1000)
      )
    },
    product['@expand'].stats.sale.duration * 1000 + 5000
  )
})

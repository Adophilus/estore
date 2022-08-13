import Server from '../../../build/api/server'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { config } from 'dotenv'
import * as dotenv from 'dotenv'
import PocketBase from 'pocketbase'
import { assert, describe, expect, test, vi } from 'vitest'

dotenv.config()
chai.use(chaiHttp)

const agent: any = chai.request(process.env.SERVER_BASE_URL)
const pocketBase = new PocketBase(process.env.POCKETBASE_URL)
const productId = 'lXXj5zaToEaSzL3'
const product = await pocketBase.Records.getOne('products', productId, {
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

  test("check that the product is removed from 'sale'", async () => {
    expect(setTimeout).toHaveBeenCalledTimes(1)
    setTimeout(async () => {
      const _product = await pocketBase.Records.getOne('products', productId, {
      expand: 'stats'
    })
      expect(product.onSale).toBeFalsy()
    }, product['@expand'].stats.sale.duration / 1000)
    // vi.advanceTimersByTime(product['@expand'].stats.sale.duration / 1000)
  }, product['@expand'].stats.sale.duration / 1000 + 5000)
})

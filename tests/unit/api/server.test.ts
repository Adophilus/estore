import chai from 'chai'
import chaiHttp from 'chai-http'
import * as dotenv from 'dotenv'
import PocketBase from 'pocketbase'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

dotenv.config()
chai.use(chaiHttp)

const agent: any = chai.request(process.env.SERVER_BASE_URL)
const pocketBase = new PocketBase(process.env.POCKETBASE_URL)

describe('Product sale', () => {
  const testSale = {
    starting: Date.now(),
    duration: 10 * 1000,
    title: 'Test sale',
    content: 'This is a sample test'
  }
  let latestSale
  const productId = 'lXXj5zaToEaSzL3'
  let product

  test('that the product is not on sale', async () => {
    product = await pocketBase.Records.getOne('products', productId, {
      expand: 'stats'
    })

    expect(product).toHaveProperty('onSale', false)
  })

  test('that the sale has been created', async () => {
    expect(await agent.put('/api/sales').send(testSale)).toHaveProperty(
      'status',
      201
    )

    latestSale = (
      await pocketBase.Records.getList('sales', 1, 1, { sort: '-created' })
    ).items[0]

    product = await pocketBase.Records.getOne('products', productId)
    expect(product).toHaveProperty('onSale', true)

    expect(latestSale).toHaveProperty('starting', testSale.starting)
    expect(latestSale).toHaveProperty('duration', testSale.duration)
    expect(latestSale).toHaveProperty('title', testSale.title)
    expect(latestSale).toHaveProperty('content', testSale.content)
  })

  test('that the sale has ended and product is not on sale', () => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        product = await pocketBase.Records.getOne('products', productId)
        expect(product).toHaveProperty('onSale', false)
        resolve(true)
      }, 15)
    })
  }, 20)
})

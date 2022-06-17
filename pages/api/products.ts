import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../utils/Models'

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      res
        .status(200)
        .json((await Product.find()).map((product) => product.toJSON()))
      break
    default:
      res.status(405).end()
      break
  }
}

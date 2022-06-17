import type { NextApiRequest, NextApiResponse } from 'next'
import { Cart } from '../../utils/Models'

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      res
        .status(200)
        .json(
          (await Cart.find({ _id: req.query.id })).map((cart) => cart.toJSON())
        )
      break
    default:
      res.status(405).end()
      break
  }
}

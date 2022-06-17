import type { NextApiRequest, NextApiResponse } from 'next'
import { Cart } from '../../utils/Models'

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      res.status(405).end()
      break
    case 'POST':
      const cart = new Cart()
      cart.save()
      res.status(200).end()
      break
    default:
      res.status(405).end()
      break
  }
}

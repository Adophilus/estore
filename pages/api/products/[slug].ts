import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../database.json'

type Data = {
  name: string
  cover: string
  images: ['tshirtblack-1.png', 'tshirtblack-2.png', 'tshirtblack-3.png']
  description: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      res
        .status(200)
        .json(db.products.find((product) => product.slug === req.query.slug))
      break
    default:
      res.status(405).end()
      break
  }
}

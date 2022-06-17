import { Product } from '../../../utils/Models'

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      const product = await Product.findOne({ slug: req.query.slug })

      if (product) res.status(200).json(product.toJSON())
      else res.status(404).json({})

      break
    default:
      res.status(405).end()
      break
  }
}

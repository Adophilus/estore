import { Cart } from '../../utils/Models'

export default async function (req, res) {
  switch (req.method) {
    case 'POST':
      const cart = new Cart()
      res.status(200).json((await cart.save()).toJSON())
      break
    default:
      res.status(405).end()
      break
  }
}

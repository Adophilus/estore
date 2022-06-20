import { Cart } from '../../../utils/Models'
import mongoose from 'mongoose'

export default async function (req, res) {
  if (req.method === 'GET') {
    if (!mongoose.Types.ObjectId.isValid(req.query.id))
      return res.status(404).end()

    const cart = await Cart.findById(req.query.id)

    if (!cart) return res.status(404).end()

    return res.status(200).json(cart.items)
  } else if (req.method === 'PUT') {
    if (!mongoose.Types.ObjectId.isValid(req.query.id))
      return res.status(404).end()

    const cart = await Cart.findById(req.query.id)
    const { product, color, size } = req.body

    if (!cart) return res.status(404).end()

    if (req.body.op === '+') {
      cart.addItem({ product, color, size })
    } else if (req.body.op === '-') {
      cart.removeItem({ product, color, size })
    } else if (req.body.op === '{}') {
      cart.empty()
    }

    console.log(cart)
    cart.markModified('items')

    await cart.save()

    return res.status(200).end()
  } else if (req.method === 'DELETE') {
    if (!mongoose.Types.ObjectId.isValid(req.query.id))
      return res.status(404).end()

    const cart = await Cart.findById(req.query.id)
    const { product, color, size } = req.body

    if (!cart) return res.status(404).end()

    cart.deleteItem({ product, color, size })
    cart.markModified('items')

    await cart.save()

    return res.status(200).end()
  } else {
    return res.status(405).end()
  }
}

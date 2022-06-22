import { Cart, Product } from '../../../../utils/Models'
import mongoose from 'mongoose'
import Stripe from 'stripe'
import config from '../../../../config/config'

const SStripe: any = Stripe.Stripe
const stripe = SStripe(config.stripe.secretKey)

export default async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.query.id))
    return res.status(404).end()

  const cart = await Cart.findById(req.query.id)

  if (!cart) return res.status(404).end()

  const cartItems = cart.items
  const totalPrice = [
    0,
    ...(await Promise.all(
      Object.keys(cartItems).map(async (slug) => {
        const product = await Product.findOne({ slug })

        const productQty = cartItems[slug]
          .map((_variant) => _variant.qty)
          .reduce((_prev, _next) => _next + _prev)
        return productQty * product.price
      })
    ))
  ].reduce((_prev, _next) => _prev + _next)

  const transformedItem = {
    price_data: {
      currency: 'usd',
      product_data: {
        // images: [item.image],
        name: 'Cart'
      },
      unit_amount: totalPrice * 100
    },
    description: 'Cart contents',
    quantity: 1
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [transformedItem],
    mode: 'payment',
    success_url: `${config.app.baseUrl}/cart/checkout?status=success`,
    cancel_url: `${config.app.baseUrl}/cart/checkout?status=cancel`,
    metadata: {
      // images: item.image
    }
  })

  return res.status(200).json({ url: session.url })
}

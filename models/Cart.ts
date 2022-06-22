import mongoose from 'mongoose'
import { ProductVariant } from '../types/Product'

type ProductDetails = {
  product: string
  color: string
  size: string
}

const Cart = new mongoose.Schema({
  items: {
    type: Object,
    default: {}
  }
})

Cart.methods.addItem = function ({ product, color, size }: ProductDetails) {
  if (!this.items[product]) this.items[product] = []
  let variant = this.items[product]?.find(
    (_variant: ProductVariant) =>
      _variant.color === color && _variant.size === size
  )
  if (variant) variant.qty += 1
  else this.items[product].push({ color, size, qty: 1 })
}

Cart.methods.removeItem = function ({ product, color, size }: ProductDetails) {
  if (!this.items[product]) return
  let item = this.items[product]?.find(
    (_variant: ProductVariant) =>
      _variant.color === color && _variant.size === size
  )
  item
    ? item.qty > 1
      ? (item.qty -= 1)
      : this.items[product].find((_variant: ProductVariant, index: number) =>
          _variant.color === item.color && _variant.size === item.size
            ? this.items[product].splice(index, 1)
            : null
        ) && this.items[product].length === 0
      ? delete this.items[product]
      : null
    : null
}

Cart.methods.deleteItem = function ({ product, color, size }: ProductDetails) {
  delete this.items[product]
}

Cart.methods.empty = function () {
  this.items = {}
}

let model
if (mongoose.models['Cart']) model = mongoose.model('Cart')
else model = mongoose.model('Cart', Cart)

export default model

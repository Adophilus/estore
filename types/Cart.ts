import { Product, ProductDetails, ProductVariant } from './Product'

export type Cart = {
  id: null | string
  create?: () => Promise<Boolean>
  empty?: () => Promise<void>
  fetchItems?: () => Promise<ProductVariant[]>
  check?: () => Promise<ProductVariant[]>
  checkout?: () => Promise<void>
  numberOfProducts?: (productDetails: ProductDetails) => number
  totalPrice?: () => Promise<number>
  addItem?: (productDetails: ProductDetails) => Promise<void>
  hasItem?: (productDetails: ProductDetails) => boolean
  getItems?: () => {
    [key: string]: ProductVariant[]
  }
  removeItem?: (productDetails: ProductDetails) => Promise<void>
  deleteItem?: (productDetails: ProductDetails) => Promise<void>
}

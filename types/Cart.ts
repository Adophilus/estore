import { Product, ProductDetails } from './Product'

type Cart = {
  create: Promise<Boolean>
  check: Promise<Array<Product>>
  fetchItems: Promise<Array<Product>>
  checkout: () => null
  addItem: (ProductDetails) => null
  numberOfProducts: (ProductDetails) => Number
  hasItem: (ProductDetails) => Boolean
  removeItem: (ProductDetails) => null
  deleteItem: (ProductDetails) => null
}

export { Cart }

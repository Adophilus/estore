import { Cart } from './Cart'
import { ProductVariant } from './Product'

export type Store = {
  state: {
    cart: {
      [key: string]: ProductVariant
    }
    favourites: Array<string>
    user: Object
  }
}

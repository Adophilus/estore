import { Cart } from './Cart'
import { ProductVariant } from './Product'

type Store = {
  state: {
    cart: Object<string, ProductVariant>
    favourites: Array<string>
    user: Object
  }
}

export { Store }

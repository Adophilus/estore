import { Product } from './Product'

export type Favourites = {
  add?: (product: Product) => void
  get?: () => null
  check?: (product: Product) => boolean
  remove?: (product: Product) => void
}

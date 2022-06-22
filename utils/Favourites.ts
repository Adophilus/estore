import { Favourites } from '../types/Favourites'

export default function ({ store }) {
  let self: Favourites = {}

  self.add = (product) => {
    if (self.check(product)) return

    let newStore = { ...store.state }
    newStore.favourites.push(product.slug)
    store.set(newStore)
  }

  self.remove = (product) => {
    let newStore = { ...store.state }
    newStore.favourites = newStore.favourites.filter(
      (_product) => _product !== product.slug
    )
    store.set(newStore)
  }

  self.get = () => {
    return { ...store.state.favourites }
  }

  self.check = (product) => {
    return store.state.favourites.includes(product.slug)
  }

  return self
}

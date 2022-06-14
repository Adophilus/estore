export default function ({ store }) {
  this.add = (product) => {
    if (this.check(product)) return

    let newStore = { ...store.state }
    newStore.favourites.push(product.slug)
    store.set(newStore)
  }

  this.remove = (product) => {
    let newStore = { ...store.state }
    newStore.favourites = newStore.favourites.filter(
      (_product) => _product !== product.slug
    )
    store.set(newStore)
  }

  this.get = () => {
    return { ...store.state.favourites }
  }

  this.check = (product) => {
    return store.state.favourites.includes(product.slug)
  }

  return this
}

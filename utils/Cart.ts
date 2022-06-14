export default function ({ store }) {
  this.addItem = ({ product, color, size }) => {
    let newStore = { ...store.state }
    if (!newStore.cart[product.slug]) newStore.cart[product.slug] = []
    let variant = newStore.cart[product.slug]?.find(
      (_variant) => _variant.color === color && _variant.size === size
    )
    if (variant) variant.qty += 1
    else newStore.cart[product.slug].push({ color, size, qty: 0 })
    store.set(newStore)
  }

  this.removeItem = (product) => {
    let newStore = { ...store.state }
    delete newStore.cart[product.slug]
    store.set(newStore)
  }

  this.getItems = () => {
    return { ...store.state.cart }
  }

  this.hasItem = ({ product, color, size }) => {
    if (!store.state.cart[product.slug]) return false

    return store.state.cart[product.slug]?.find(
      (_variant) => _variant.color === color && _variant.size === size
    )
  }

  return this
}

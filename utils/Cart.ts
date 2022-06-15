export default function ({ store }) {
  this.addItem = ({ product, color, size }) => {
    let newStore = { ...store.state }
    if (!newStore.cart[product.slug]) newStore.cart[product.slug] = []
    let variant = newStore.cart[product.slug]?.find(
      (_variant) => _variant.color === color && _variant.size === size
    )
    if (variant) variant.qty += 1
    else newStore.cart[product.slug].push({ color, size, qty: 1 })
    store.set(newStore)
  }

  this.removeItem = ({ product, color, size }) => {
    let newStore = { ...store.state }
    if (!newStore.cart[product.slug]) return
    let item = newStore.cart[product.slug]?.find(
      (_variant) => _variant.color === color && _variant.size === size
    )
    item ? item.qty > 1 ? item.qty -= 1 : newStore.cart[product.slug].find((_variant, index) => _variant.color === item.color && _variant.size === item.size ? newStore.cart[product.slug].splice(index, 1) : null) : null
    store.set(newStore)
  }

  this.deleteItem = ({ product, color, size }) => {
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

  this.numberOfProducts = ({ product, color, size }) => {
    return store.state.cart[product.slug]?.find(_variant => _variant.color === color && _variant.size === size)?.qty
  }

  return this
}

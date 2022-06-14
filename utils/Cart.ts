export default function ({ store }) {
  this.addItem = ({ product }) => {
    let newStore = { ...store.state }
    newStore.cart[product.slug] = store.state.cart[product.slug]
      ? store.state.cart[product.slug]++
      : 1
    store.set(newStore)
  }

  this.getItems = () => {
    return { ...store.state.cart }
  }

  return this
}

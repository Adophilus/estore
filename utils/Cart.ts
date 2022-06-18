// import db from '../database.json'

export default function ({ store }) {
  const create = async () => {
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      this.id = (await res.json())._id
      localStorage.setItem('cart', this.id)
    }

    return res.ok
  }

  const check = () => {
    if (typeof window === 'undefined') return
    if (!this.id) {
      this.id = localStorage.getItem('cart')
    }
    return this.fetchItems()
  }

  const init = async () => {
    await check()
  }

  this.fetchItems = async () => {
    const res = await fetch(`/api/cart/${this.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      const newStore = { ...store.state }
      newStore.cart = await res.json()
      store.set(newStore)
      return newStore.cart
    } else {
      await create()
      return []
    }
  }

  this.addItem = async ({ product, color, size }) => {
    if (!(await check())) return

    let newStore = { ...store.state }
    if (!newStore.cart[product.slug]) newStore.cart[product.slug] = []
    let variant = newStore.cart[product.slug]?.find(
      (_variant) => _variant.color === color && _variant.size === size
    )
    if (variant) variant.qty += 1
    else newStore.cart[product.slug].push({ color, size, qty: 1 })

    const res = await fetch(`/api/cart/${this.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ op: '+', product: product.slug, color, size })
    })

    if (res.ok) {
      store.set(newStore)
    }
  }

  this.removeItem = async ({ product, color, size }) => {
    if (!(await check())) return

    let newStore = { ...store.state }
    if (!newStore.cart[product.slug]) return
    let item = newStore.cart[product.slug]?.find(
      (_variant) => _variant.color === color && _variant.size === size
    )
    item
      ? item.qty > 1
        ? (item.qty -= 1)
        : newStore.cart[product.slug].find((_variant, index) =>
            _variant.color === item.color && _variant.size === item.size
              ? newStore.cart[product.slug].splice(index, 1)
              : null
          ) && newStore.cart[product.slug].length === 0
        ? delete newStore.cart[product.slug]
        : null
      : null

    const res = await fetch(`/api/cart/${this.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ op: '-', product: product.slug, color, size })
    })

    if (res.ok) {
      store.set(newStore)
    }
  }

  this.deleteItem = async ({ product, color, size }) => {
    if (!(await check())) return

    let newStore = { ...store.state }
    delete newStore.cart[product.slug]

    const res = await fetch(`/api/cart/${this.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product: product.slug, color, size })
    })

    if (res.ok) {
      store.set(newStore)
    }
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
    return store.state.cart[product.slug]?.find(
      (_variant) => _variant.color === color && _variant.size === size
    )?.qty
  }

  this.totalPrice = async () => {
    if (!(await check())) return

    const cartItems = this.getItems()
    return [
      0,
      ...(await Promise.all(
        Object.keys(cartItems).map(async (slug) => {
          const res = await fetch(`/api/products/${slug}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })

          if (!res.ok) {
            return
          }

          const productPrice = (await res.json()).price

          const productQty = cartItems[slug]
            .map((_variant) => _variant.qty)
            .reduce((_prev, _next) => _next + _prev)
          return productQty * productPrice
        })
      ))
    ].reduce((_prev, _next) => _prev + _next)
  }

  init()

  return this
}

import { Product, ProductDetails, ProductVariant } from '../types/Product'
import { Cart } from '../types/Cart'

export default function ({ store }) {
  let self: Cart = { id: null }

  const create = async () => {
    const res = await fetch(`${window.location.origin}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      self.id = (await res.json())._id
      localStorage.setItem('cart', self.id)
    }

    return res.ok
  }

  const check = () => {
    if (typeof window === 'undefined') return
    if (!self.id) {
      self.id = localStorage.getItem('cart')
    }
    return self.fetchItems()
  }

  const init = async () => {
    await check()
  }

  self.fetchItems = async () => {
    const res = await fetch(`${window.location.origin}/api/cart/${self.id}`, {
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

  self.addItem = async ({ product, color, size }: ProductDetails) => {
    if (!(await check())) return

    let newStore = { ...store.state }
    if (!newStore.cart[product.slug]) newStore.cart[product.slug] = []
    let variant = newStore.cart[product.slug]?.find(
      (_variant) => _variant.color === color && _variant.size === size
    )
    if (variant) variant.qty += 1
    else newStore.cart[product.slug].push({ color, size, qty: 1 })

    const res = await fetch(`${window.location.origin}/api/cart/${self.id}`, {
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

  self.removeItem = async ({ product, color, size }: ProductDetails) => {
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

    const res = await fetch(`${window.location.origin}/api/cart/${self.id}`, {
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

  self.deleteItem = async ({ product, color, size }: ProductDetails) => {
    if (!(await check())) return

    let newStore = { ...store.state }
    delete newStore.cart[product.slug]

    const res = await fetch(`${window.location.origin}/api/cart/${self.id}`, {
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

  self.getItems = () => {
    return { ...store.state.cart }
  }

  self.hasItem = ({ product, color, size }: ProductDetails) => {
    if (!store.state.cart[product.slug]) return false

    return store.state.cart[product.slug]?.find(
      (_variant) => _variant.color === color && _variant.size === size
    )
  }

  self.numberOfProducts = ({ product, color, size }: ProductDetails) => {
    return store.state.cart[product.slug]?.find(
      (_variant) => _variant.color === color && _variant.size === size
    )?.qty
  }

  self.totalPrice = async () => {
    if (!(await check())) return

    const cartItems = self.getItems()
    return [
      0,
      ...(await Promise.all(
        Object.keys(cartItems).map(async (slug) => {
          const res = await fetch(
            `${window.location.origin}/api/products/${slug}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )

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

  self.checkout = async () => {
    const checkoutSession = await fetch(
      `${window.location.origin}/api/cart/${self.id}/checkout`
    )
    if (!checkoutSession.ok) {
      return
    }

    if (typeof window !== 'undefined')
      window.open((await checkoutSession.json()).url, '_blank')
  }

  self.empty = async () => {
    if (!(await check())) return

    let newStore = { ...store.state }
    newStore.cart = {}

    const res = await fetch(`${window.location.origin}/api/cart/${self.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ op: '{}' })
    })

    if (res.ok) {
      store.set(newStore)
    }
  }

  init()

  return self
}

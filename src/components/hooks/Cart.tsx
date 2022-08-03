import AppContext from '../../contexts/App'
import { ICart, IProductVariant } from '../../utils'
import { useContext, useEffect, useState } from 'preact/hooks'

export function useCart({ pocketBaseClient, Provider }) {
  const [items, setItems] = useState([])
  const [cart, setCart] = useState()

  const initCart = async () => {
    if (pocketBaseClient.AuthStore.isValid) {
      const _carts = await pocketBaseClient.Records.getList(
        'carts',
        1,
        1,
        {
          sort: '-created',
          expand: 'items'
        },
        { $autoCancel: false }
      )
      if (_carts.items.length) {
        const _cart = _carts.items[0]
        if (_cart.items.length) setItems(_cart['@expand'].items)
        setCart(_cart)
      } else {
        const newCart = await pocketBaseClient.Records.create(
          'carts',
          {
            owner: pocketBaseClient.AuthStore.model.profile.id
          },
          {
            expand: 'items'
          }
        )
        setCart(newCart)
      }
    }
  }

  useEffect(() => {
    initCart()
  }, [Provider.provider])

  return {
    items,
    async addItem({ product, color, size, quantity = 1 }: IProductVariant) {
      let cartItem = items.filter(
        (_cartItem) =>
          _cartItem.product === product.id &&
          _cartItem.color === color &&
          _cartItem.size === size
      )[0]

      if (cartItem) {
        cartItem = await pocketBaseClient.Records.update(
          'cart_items',
          cartItem.id,
          {
            product: product.id,
            color,
            size,
            quantity
          }
        )
        setItems([...items, cartItem])
        await pocketBaseClient.Records.update('carts', cart.id, {
          owner: cart.owner,
          items: [...items.map((_item) => _item.id), cartItem.id]
        })
      } else {
        const cartItem = await pocketBaseClient.Records.create('cart_items', {
          product: product.id,
          color,
          size,
          quantity
        })
        setItems([...items, cartItem])
        await pocketBaseClient.Records.update('carts', cart.id, {
          owner: cart.owner,
          items: [...items.map((_item) => _item.id), cartItem.id]
        })
      }
      return true
    },
    getItems() {}
  } as ICart
}

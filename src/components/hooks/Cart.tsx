import AppContext from '../../contexts/App'
import { ICart, IProductVariant } from '../../utils'
import { useContext, useEffect, useState } from 'preact/hooks'

export function useCart({ pocketBaseClient, Provider }) {
  const [items, setItems] = useState([])
  const [cart, setCart] = useState()
  const [init, setInit] = useState(false)

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
        setCart(_cart)
        if (_cart.items.length) setItems(_cart['@expand'].items)
        else setItems([])
      } else {
        const newCart = await pocketBaseClient.Records.create(
          'carts',
          {
            owner: pocketBaseClient.AuthStore.model.profile.id
          },
          {
            $autoCancel: false,
            expand: 'items'
          }
        )
        setCart(newCart)
        setItems([])
      }
    }

    setInit(true)
  }

  useEffect(() => {
    initCart()
  }, [])

  return {
    items,
    init,
    async updateItem({ product, color, size, quantity = 1 }: IProductVariant) {
      if (quantity <= 0) {
        return await this.deleteItem({ product, color, size, quantity })
      }

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
          },
          {
            $autoCancel: false
          }
        )
        await pocketBaseClient.Records.update(
          'carts',
          cart.id,
          {
            owner: cart.owner,
            items: [...items.map((_item) => _item.id), cartItem.id]
          },
          {
            $autoCancel: false
          }
        )
        setItems(
          items.map((_item) => {
            if (_item.id === cartItem.id) return cartItem
            return _item
          })
        )
      } else {
        const cartItem = await pocketBaseClient.Records.create(
          'cart_items',
          {
            product: product.id,
            color,
            size,
            quantity
          },

          {
            $autoCancel: false
          }
        )
        setItems([...items, cartItem])
        await pocketBaseClient.Records.update(
          'carts',
          cart.id,
          {
            owner: cart.owner,
            items: [...items.map((_item) => _item.id), cartItem.id]
          },
          {
            $autoCancel: false
          }
        )
      }
    },
    async deleteItem({ product, color, size, quantity = 1 }: IProductVariant) {
      const cartItemId = items.filter(
        (_cartItem) =>
          _cartItem.product === product.id &&
          _cartItem.color === color &&
          _cartItem.size === size
      )[0].id
      await pocketBaseClient.Records.update(
        'carts',
        cart.id,
        {
          owner: cart.owner,
          items: items
            .map((_item) => _item.id)
            .filter((_item) => _item.id !== cartItemId)
        },
        {
          $autoCancel: false
        }
      )
      await pocketBaseClient.Records.delete('cart_items', cartItemId, {
        $autoCancel: false
      })
      setItems(items.filter((_item) => _item.id !== cartItemId))
    },
    getItems() {}
  } as ICart
}

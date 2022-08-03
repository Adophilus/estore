import AppContext from '../../contexts/App'
import { ICart, IProductVariant } from '../../utils'
import { useContext, useEffect, useState } from 'preact/hooks'

export function useCart({ pocketBaseClient, Provider }) {
  const [items, setItems] = useState([])
  const [cart, setCart] = useState()

  const initCart = async () => {
    try {
      if (pocketBaseClient.AuthStore.isValid) {
        const _carts = await pocketBaseClient.Records.getList('carts', 1, 1, {
          sort: '-created',
          expand: 'items'
        })
        if (_carts.items.length) {
          const _cart = _carts.items[0]
          setCart(_carts.items[0])
        } else {
          const _cart = await pocketBaseClient.Records.create(
            'carts',
            {
              owner: pocketBaseClient.AuthStore.model.profile.id
            },
            {
              expand: 'items'
            }
          )

          setCart(_cart)
        }
      }
    } catch (err) {
      console.log(err)
      console.log(err.data)
    }
  }

  useEffect(() => {
    initCart()
  }, [Provider.provider])

  return {
    items,
    async addItem({ product, color, size, quantity = 1 }: IProductVariant) {
      for (let i = 0; i < cart.items.length; i++) {
        const cartItem = cart['@expand'].items[i]

        if (
          cartItem.product === product.id &&
          cartItem.color === color &&
          cartItem.size === size
        ) {
          const updatedCartItem = await pocketBaseClient.Records.update(
            'cart_items',
            cartItem.id,
            {
              product: product.id,
              color,
              size,
              quantity
            }
          )
          await pocketBaseClient.Records.update('carts', cart.id, {
            ...cart,
            items: [...cart.items, updatedCartItem.id]
          })
          return true
        }
      }
      console.log('breadcrumb 1')
      // console.log(color)
      // console.log(size)
      // console.log(quantity)
      const newCartItem = await pocketBaseClient.Records.create('cart_items', {
        product: product.id,
        color,
        size,
        quantity
      })
      console.log('breadcrumb 2')
      console.log(cart.id)
      // console.log([...cart.items, newCartItem.id])
      await pocketBaseClient.Records.update('carts', cart.id, {
        owner: cart.owner,
        items: [...cart.items] //, newCartItem.id]
      })
      console.log('breadcrumb 3')
      return true
    },
    getItems() {}
  } as ICart
}

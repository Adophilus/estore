import MainLayout from '../components/layouts/main/Layout'
import CartProduct from '../components/cart/Product'
import CheckoutButton from '../components/cart/CheckoutButton'
import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'

export default ({ store, cart }) => {
  const [cartItems, setCartItems] = useState({})
  const [products, setProducts] = useState([])

  useEffect(() => {
    cart.fetchItems().then(async (items) => {
      setCartItems(items)
      const slugs = Object.keys(items)
      let p = []
      for (let i = 0; i < slugs.length; i++) {
        const res = await fetch(`/api/products/${slugs[i]}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!res.ok) {
          console.warn(`Error: ${res.status}`)
          return
        }

        const newProduct = await res.json()
        p.push(newProduct)
      }
      setProducts(p)
    })
  }, [])

  return (
    <MainLayout store={store} cart={cart}>
      <section className="text-gray-600 body-font overflow-hidden w-2/3 mx-auto">
        <div className="container px-5 mx-auto md:py-24">
          <div className="flex flex-col gap-y-4 divide-y-2 divide-gray-100">
            {products.map((_product, index) => {
              return cartItems[_product.slug].map((_variant, index) => (
                <CartProduct
                  key={index}
                  cart={cart}
                  store={store}
                  product={_product}
                  onRemoved={() => cartItems[_product.slug].splice(index, 1)}
                  color={_variant.color}
                  size={_variant.size}
                  qty={_variant.qty}
                />
              ))
            })}
          </div>
          <div className="flex justify-end mt-6 divide-y-2 divide-gray-100">
            <CheckoutButton cart={cart} />
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

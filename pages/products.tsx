import Head from 'next/head'
// import db from '../database.json'
import StoreLayout from '../components/layouts/store/Layout'
import Product from '../components/product/Product'
import { useState } from 'react'

export default ({ store, cart, favourites }) => {
  const [products, setProducts] = useState([])

  ;(async () => {
    const res = await fetch('/api/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`)
    }

    setProducts(await res.json())
  })()

  return (
    <StoreLayout store={store}>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object(products).map((product, index) => (
              <Product
                key={index}
                product={product}
                store={store}
                cart={cart}
                favourites={favourites}
              />
            ))}
          </div>
        </div>
      </section>
    </StoreLayout>
  )
}

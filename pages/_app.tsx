import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import Cart from '../utils/Cart.ts'

function Store() {
  let [store, setStore] = useState({
    cart: {},
    user: {}
  })

  return {
    state: store,
    set: setStore
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const store = new Store()
  const cart = new Cart({ store })

  return <Component store={store} cart={cart} {...pageProps} />
}

export default MyApp

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'

function Store() {
  let cart = {}
  let user = {}
  let [store, setStore] = useState({
    cart: this.cart,
    user: {}
  })

  return {
    cart,
    user
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const store = new Store()
  return <Component store={store} {...pageProps} />
}

export default MyApp

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'

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
  return <Component store={store} {...pageProps} />
}

export default MyApp

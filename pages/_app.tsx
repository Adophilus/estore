import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Cart from '../utils/Cart'
import Favourites from '../utils/Favourites'
import Store from '../utils/Store'

function MyApp({ Component, pageProps }: AppProps) {
  const store = new Store()
  const cart = new Cart({ store })
  const favourites = new Favourites({ store })

  return (
    <Component
      store={store}
      cart={cart}
      favourites={favourites}
      {...pageProps}
    />
  )
}

export default MyApp

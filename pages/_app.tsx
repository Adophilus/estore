import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Cart from '../utils/Cart'
import Favourites from '../utils/Favourites'
import Store from '../utils/Store'
import { Store as TStore } from '../types/Store'
import { Cart as TCart } from '../types/Cart'
import { Favourites as TFavourites } from '../types/Favourites'

function MyApp({ Component, pageProps }: AppProps) {
  const store: TStore = Store()
  const cart: TCart = new Cart({ store })
  const favourites: TFavourites = new Favourites({ store })

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

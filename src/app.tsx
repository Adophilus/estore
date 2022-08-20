import { useCart } from './components/hooks/Cart'
import { useFavourites } from './components/hooks/Favourites'
import { useProvider } from './components/hooks/Provider'
import { useNotifications } from './components/hooks/Notifications'
import config from './config'
import AppContext from './contexts/App'
import HomeView from './views/Home'
import LoginView from './views/Login'
import ProductView from './views/Product'
import ShopView from './views/Shop'
import TestView from './views/Test'
import AuthGoogle from './views/auth/Google'
import UserCartView from './views/user/Cart'
import UserFavouritesView from './views/user/Favourites'
import PocketBase from 'pocketbase'
import Router from 'preact-router'

export default function () {
  const pocketBaseClient = new PocketBase(config.pocketBaseHost)
  const Provider = useProvider({ pocketBaseClient })
  const cart = useCart({ pocketBaseClient, Provider })
  const favourites = useFavourites({ pocketBaseClient })
  const notifications = useNotifications({ pocketBaseClient })

  return (
    <AppContext.Provider
      value={{ pocketBaseClient, Provider, cart, favourites, notifications, config }}
    >
      <Router>
        <HomeView path="/" />
        <ShopView path="/shop" />
        <ProductView path="/shop/products/:slug" />
        <LoginView path="/login" />
        <TestView path="/test" />
        <AuthGoogle path="/auth/google" />
        <UserCartView path="/user/cart" />
        <UserFavouritesView path="/user/favourites" />
        <div default>
          404
          <br />
          Page not found!
        </div>
      </Router>
    </AppContext.Provider>
  )
}

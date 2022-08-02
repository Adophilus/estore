import AppContext from './contexts/App'
import { Provider } from './utils'
import HomeView from './views/Home'
import LoginView from './views/Login'
import ProductView from './views/Product'
import ShopView from './views/Shop'
import TestView from './views/Test'
import AuthGoogle from './views/auth/Google'
import UserCartView from './views/user/Cart'
import PocketBase from 'pocketbase'
import Router from 'preact-router'
import { Match } from 'preact-router/match'
import { useEffect, useState } from 'preact/hooks'

export default function () {
  const pocketBaseClient = new PocketBase('http://127.0.0.1:8090')
  const provider = useProvider({ pocketBaseClient })
  const cart = useCart({ pocketBaseClient, provider })

  return (
    <AppContext.Provider value={{ pocketBaseClient, provider, cart }}>
      <Router>
        <HomeView path="/" />
        <ShopView path="/shop" />
        <ProductView path="/shop/products/:slug" />
        <LoginView path="/login" />
        <TestView path="/test" />
        <AuthGoogle path="/auth/google" />
        <UserCartView path="/user/cart" />
        <div default>
          404
          <br />
          Page not found!
        </div>
      </Router>
    </AppContext.Provider>
  )
}

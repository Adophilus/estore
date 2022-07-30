import AppContext from './contexts/App'
import { Cart } from './utils'
import HomeView from './views/Home'
import LoginView from './views/Login'
import ProductView from './views/Product'
import ShopView from './views/Shop'
import TestView from './views/Test'
import PocketBase from 'pocketbase'
import Router from 'preact-router'
import { Match } from 'preact-router/match'
import { useState } from 'preact/hooks'

export default function () {
  const pocketBaseClient = new PocketBase('http://127.0.0.1:8090')
  const cart = new Cart()

  return (
    <AppContext.Provider value={{ pocketBaseClient, cart }}>
      <Router>
        <HomeView path="/" />
        <ShopView path="/shop" />
        <ProductView path="/shop/products/:slug" />
        <LoginView path="/login" />
        <TestView path="/test" />
        <div default>
          404
          <br />
          Page not found!
        </div>
      </Router>
    </AppContext.Provider>
  )
}

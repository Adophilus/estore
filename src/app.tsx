import AppContext from './contexts/App'
import HomeView from './views/Home'
import ProductView from './views/Product'
import ShopView from './views/Shop'
import TestView from './views/Test'
import PocketBase from 'pocketbase'
import Router from 'preact-router'
import { Match } from 'preact-router/match'
import { useState } from 'preact/hooks'

export default function () {
  const pocketBaseClient = new PocketBase('http://127.0.0.1:8090')

  return (
    <AppContext.Provider value={{ pocketBaseClient }}>
      <Router>
        <HomeView path="/" />
        <ShopView path="/shop" />
        <ProductView path="/shop/products/:slug" />
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

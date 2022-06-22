import Navbar from './Navbar'
import Footer from './Footer'
import { ReactNode } from 'react'
import { Cart } from '../../../types/Cart'
import { Store } from '../../../types/Store'

type Props = {
  children: ReactNode
  store: Store
  cart?: Cart
}

export default ({ children, store }: Props) => {
  return (
    <>
      <Navbar store={store} />

      <main>{children}</main>

      <Footer />
    </>
  )
}

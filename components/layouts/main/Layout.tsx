import Navbar from './Navbar'
import Footer from './Footer'
import { ReactNode } from 'react'
import { Store } from '../../../types/Store'

type Props = {
  children: ReactNode
  store: Store
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

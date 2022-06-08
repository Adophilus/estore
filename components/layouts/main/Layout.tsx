import Navbar from './Navbar'
import Footer from './Footer'

export default ({ children, store }) => {
  return (
    <>
      <Navbar store={store} />

      <main>{children}</main>

      <Footer />
    </>
  )
}

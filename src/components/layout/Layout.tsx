import Banner from './Banner'
import Footer from './Footer'
import Navbar from './Navbar'
import Search from './Search'

export default function ({ children }) {
  return (
    <>
      <Banner />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Search />
    </>
  )
}

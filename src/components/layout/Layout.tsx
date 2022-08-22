import Banner from './Banner'
import Footer from './Footer'
import Navbar from './Navbar'
import Search from './Search'
import NotificationWidget  from './NotificationWidget'

export default function ({ children }) {
  return (
    <>
      <Banner />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Search />
      <NotificationWidget />
    </>
  )
}

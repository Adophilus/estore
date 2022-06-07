// import Navbar from "./Navbar.tsx"
// import Footer from "./Footer.tsx"

export default ({ children }) => {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </>
  )
}

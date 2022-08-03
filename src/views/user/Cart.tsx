import '../../assets/pushable.css'
import '../../assets/sliding-color.css'
import { useCart } from '../../components/hooks/Cart'
import Layout from '../../components/layout/Layout'
import AppContext from '../../contexts/App'
import { Provider } from '../../utils'
import { useContext, useEffect } from 'preact/hooks'

export default function () {
  const { pocketBaseClient, cart } = useContext(AppContext)
  useEffect(() => cart.getItems(), [])

  return (
    <Layout>
      <section className="d-flex flex-column my-5 align-items-center">
        {cart.items.map((item) => item.name)}
      </section>
    </Layout>
  )
}

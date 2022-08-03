import AppContext from '../contexts/App'
import { useContext, useEffect, useRef } from 'preact/hooks'

export default function () {
  const { pocketBaseClient } = useContext(AppContext)

  const getCarts = async () => {
    let cart

    try {
      const carts = await pocketBaseClient.Records.getList('carts', 1, 1, {
        sort: '-created',
        $autoCancel: false
      })

      cart = carts.items[0]
    } catch (err) {
      console.log(err)
    }

    await pocketBaseClient.Records.update('carts', cart.id, {
      owner: cart.owner,
      items: ['HrZN5h962NQtITd', 'BiogYLhRQzAqn48']
    })
  }

  useEffect(() => {
    getCarts()
  }, [])

  return <h1>Test</h1>
}

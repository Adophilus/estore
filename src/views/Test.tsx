import AppContext from '../contexts/App'
import { useContext, useEffect, useRef } from 'preact/hooks'

export default function () {
  const { pocketBaseClient } = useContext(AppContext)

  const test = async () => {
    const product = (await pocketBaseClient.Records.getList('products', 1, 1))
      .items[0]
    const url = await pocketBaseClient.Records.getFileUrl(product, product.id)
    console.log(url)
  }

  useEffect(() => {
    test()
  }, [])

  return <h1>Test</h1>
}

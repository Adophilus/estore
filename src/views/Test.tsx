import AppContext from '../contexts/App'
import { useContext, useEffect, useRef } from 'preact/hooks'

export default function () {
  const { pocketBaseClient } = useContext(AppContext)

  const test = async () => {
    const productsList = await pocketBaseClient.Records.getList(
      'products',
      1,
      10,
      {
        expand: 'stats',
        sort: '+stats.trending'
      }
    )
    console.log(productsList.items)
  }

  useEffect(() => {
    test()
  }, [])

  return <h1>Test</h1>
}

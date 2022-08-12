import AppContext from '../contexts/App'
import { useContext, useEffect, useRef } from 'preact/hooks'

export default function () {
  useEffect(() => {
    fetch('/api/products/test')
      .then((res) => res.text())
      .then((data) => console.log(data))
  }, [])

  return <h1>Test</h1>
}

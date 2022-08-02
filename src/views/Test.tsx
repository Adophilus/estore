import AppContext from '../contexts/App'
import { useContext, useEffect, useRef } from 'preact/hooks'

export default function () {
  const { pocketBaseClient } = useContext(AppContext)
  const selectRef = useRef()

  useEffect(() => {
    console.log(pocketBaseClient)
  }, [])

  return <h1>Test</h1>
}

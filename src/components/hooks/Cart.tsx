import { useContext, useState } from 'preact/hooks'

export function useCart({ pocketBaseClient, provider }) {
  const [items, useitems] = useState([])

  return { items }
}

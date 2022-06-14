import { useState } from 'react'

export default function () {
  let [store, setStore] = useState({
    cart: {
      // 'mens-tshirt-black': [{ color: '#FFFF'}]
      // 'womens-gown-white': 2
    },
    favourites: [],
    user: {}
  })

  return {
    state: store,
    set: setStore
  }
}

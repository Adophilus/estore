import { useState } from 'react'

export default function () {
  let [store, setStore] = useState({
    cart: {
      'mens-tshirt-black': 1
    },
    favourites: [],
    user: {}
  })

  return {
    state: store,
    set: setStore
  }
}

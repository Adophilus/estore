import { useState } from 'react'

export default function () {
  let [store, setStore] = useState({
    cart: {
      // 'mens-tshirt-dark': [
      //   {
      //     color: '#000000',
      //     size: 'sm',
      //     qty: 1
      //   }
      // ],
      // 'mens-tshirt-light': [
      //   {
      //     color: '#FFFFFF',
      //     size: 'sm',
      //     qty: 3
      //   }
      // ]
    },
    favourites: [],
    user: {}
  })

  return {
    state: store,
    set: setStore
  }
}

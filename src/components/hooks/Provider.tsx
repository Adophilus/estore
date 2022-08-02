import { useState } from 'preact/hooks'

export default function ({ pocketBaseClient }) {
  const [auth, setAuth] = useState(null)
  const [provider, SetProvider] = useState(
    window.localStorage.getItem('provider')
  )

  return {
    provider,
    auth,
    setProvider(_provider) {
      SetProvider(_provider)
      window.localStorage.setItem('provider', JSON.stringify(_provider))
    }
  }
}

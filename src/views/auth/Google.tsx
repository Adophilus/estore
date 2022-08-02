import AppContext from '../../contexts/App'
import { Provider } from '../../utils'
import { useContext, useEffect } from 'preact/hooks'

export default function () {
  const { pocketBaseClient } = useContext(AppContext)
  const queryParams = new URLSearchParams(window.location.search)
  const redirectUrl = `${window.location.origin}/auth/google`

  const authWithGoogle = async () => {
    const provider = new Provider()
    provider.get()

    try {
      const auth = await pocketBaseClient.Users.authViaOAuth2(
        provider.provider.name,
        queryParams.get('code'),
        provider.provider.codeVerifier,
        redirectUrl
      )
      provider.set({
        ...provider.provider,
        code: queryParams.get('code'),
        redirectUrl
      })
      window.location.href = '/shop'
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => authWithGoogle(), [])
}

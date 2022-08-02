import { useState } from 'preact/hooks'

export function useProvider({ pocketBaseClient }) {
  const [auth, setAuth] = useState(null)
  let internalProvider = JSON.parse(window.localStorage.getItem('provider'))
  const [provider, setProvider] = useState({ ...internalProvider })

  return {
    provider,
    auth,
    async authenticate(code) {
      const auth = await pocketBaseClient.Users.authViaOAuth2(
        internalProvider.name,
        code,
        internalProvider.codeVerifier,
        internalProvider.redirectUrl
      )
      setAuth(auth)
      return auth
    },
    async use(_providerName, _redirectEndpoint) {
      const _provider = (
        await pocketBaseClient.Users.listAuthMethods()
      ).authProviders.filter(
        (__provider) => __provider.name === _providerName
      )[0]
      internalProvider = {
        ..._provider,
        redirectUrl: `${window.location.origin}${_redirectEndpoint}`
      }
      this.set({ ...internalProvider })
      return _provider
    },
    getAuthUrl() {
      return internalProvider.authUrl + internalProvider.redirectUrl
    },
    redirect(options = {}) {
      if (options.newtab) window.open(this.getAuthUrl(), '_blank')
      else window.location.href = this.getAuthUrl()
    },
    set(_provider) {
      setProvider(_provider)
      window.localStorage.setItem('provider', JSON.stringify(_provider))
    }
  }
}

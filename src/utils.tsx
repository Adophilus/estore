import { useState } from 'preact/hooks'

export interface ICart {
  id: string
  items: IProductVariant[]
  getItems: Promise<IProductVariant[]>
}

export interface IProviderObject {
  name: string
  codeVerifier: string
  state: string
}

export interface IProvider {
  set: void
  get: Promise[IProviderObject]
  provider: IProviderObject
}

export class Cart implements ICart {
  constructor({ pocketBaseClient, provider }) {
    this.client = pocketBaseClient
    this.provider = provider
    const [items, setItems] = useState()
    this.items = items
    this.setItems = setItems
  }

  async getItems() {
    const auth = await pocketBaseClient.Users.authViaOAuth2(
      this.provider.get('name'),
      this.provider.get('codeVerifier'),
      this.provider.get('code'),
      this.provider.get('redirectUrl')
    )
    console.log(auth)
  }
}

export class LocalCart implements ICart {
  constructor() {
    this.items = []
  }
}

export class Provider implements IProvider {
  constructor(provider) {
    if (provider) this.set(provider)
    this.provider = null
  }

  set(provider) {
    window.localStorage.setItem('provider', JSON.stringify(provider))
    this.provider = provider
  }

  get(key) {
    if (key) {
      return this.provider[key]
    }

    this.provider = JSON.parse(window.localStorage.getItem('provider'))
    return this.provider
  }
}

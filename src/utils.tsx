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

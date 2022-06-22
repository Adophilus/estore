import MainLayout from '../main/Layout'
import { ReactNode } from 'react'
import { Store } from '../../../types/Store'

type Props = {
  children: ReactNode
  store: Store
}

export default ({ children, store }: Props) => {
  return <MainLayout store={store}>{children}</MainLayout>
}

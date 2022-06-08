import MainLayout from '../main/Layout'

export default ({ children, store }) => {
  return <MainLayout store={store}>{children}</MainLayout>
}

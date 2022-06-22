import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default ({ cart }) => {
  const router = useRouter()
  const { status } = router.query

  const redirectPage = async () => {
    await cart.empty()
    typeof window !== 'undefined' ? (window.location.href = '/') : null
  }

  useEffect(() => {
    if (status === 'success') {
      redirectPage()
    }
  }, [status])

  if (status === 'success') {
    return (
      <div>
        <header>Checkout successful</header>
      </div>
    )
  } else if (status === 'cancel')
    return (
      <div>
        <header>Checkout failed</header>
      </div>
    )
}

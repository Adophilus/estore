import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default ({ cart }) => {
  const router = useRouter()
  const { status } = router.query

  useEffect(() => {
    if (status === 'success') {
      ;(async () => {
        await cart.empty()
        typeof window !== 'undefined' ? (window.location = '/') : null
      })()
    }
  }, [router])

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

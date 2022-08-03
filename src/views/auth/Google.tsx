import AppContext from '../../contexts/App'
import { useContext, useEffect } from 'preact/hooks'

export default function () {
  const { pocketBaseClient, Provider } = useContext(AppContext)
  const queryParams = new URLSearchParams(window.location.search)

  const authWithGoogle = async () => {
    try {
      await Provider.authenticate(queryParams.get('code'))
      window.location.href = '/shop'
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => authWithGoogle(), [])
}

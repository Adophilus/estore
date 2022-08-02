import '../assets/pushable.css'
import '../assets/sliding-color.css'
import Layout from '../components/layout/Layout'
import AppContext from '../contexts/App'
import { Provider } from '../utils'
import { useContext, useEffect, useRef, useState } from 'preact/hooks'

export default function () {
  const { pocketBaseClient } = useContext(AppContext)
  const [loginError, setLoginError] = useState(false)
  let email = useRef()
  let password = useRef()
  const provider = new Provider()

  const loginUser = async () => {
    try {
      await pocketBaseClient.Users.authViaEmail(email.current, password.current)
    } catch (err) {
      if (err.data.code === 400) {
        setLoginError(true)
      }
    }
  }

  const googleOAuth = async () => {
    const redirectUrl = `${window.location.origin}/auth/google`

    try {
      provider.set(
        (await pocketBaseClient.Users.listAuthMethods()).authProviders.filter(
          (provider) => provider.name === 'google'
        )[0]
      )
      window.location.href = provider.provider.authUrl + redirectUrl
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>
      <section className="d-flex flex-column my-5 align-items-center">
        {loginError && (
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            Invalid email and/or password!
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => setLoginError(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <form
          style={{
            boxShadow:
              'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
          }}
          onSubmit={(e) => {
            e.preventDefault()
            loginUser()
          }}
          className="shop__form w-45 border border-dark p-3"
        >
          <div className="py-3">
            <h2
              class="text-center"
              style={{
                fontFamily: 'Volkhov',
                textTransform: 'uppercase',
                letterSpacing: '3px'
              }}
            >
              Login
            </h2>
          </div>
          <div>
            <div className="form__control mb-3">
              <i class="fa fa-user px-3" aria-hidden="true"></i>
              <input
                type="email"
                onChange={(e) => (email.current = e.target.value)}
                placeholder="email"
              />
            </div>
            <div className="form__control mb-3">
              <i class="fa fa-lock px-3" aria-hidden="true"></i>
              <input
                type="password"
                onChange={(e) => (password.current = e.target.value)}
                placeholder="password"
              />
            </div>
            <div className="form__control sliding-color mb-3 border-0">
              <button className="w-100 py-2" type="submit">
                <span>LOGIN</span>
              </button>
            </div>
            <div>
              <button
                class="pushable w-100"
                type="button"
                onClick={() => googleOAuth()}
              >
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front py-2">
                  <i class="fa fa-google text-light" aria-hidden="true"></i>
                  &nbsp; Continue with Google
                </span>
              </button>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  )
}

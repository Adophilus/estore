import Layout from '../components/layout/Layout'
import AppContext from '../contexts/App'
import { useContext, useEffect, useRef, useState } from 'preact/hooks'

export default function () {
  const { pocketBaseClient } = useContext(AppContext)
  const [loginError, setLoginError] = useState(false)

  let email = useRef()
  let password = useRef()

  const loginUser = async () => {
    try {
      await pocketBaseClient.Users.authViaEmail(email.current, password.current)
    } catch (err) {
      if (err.data.code === 400) {
        setLoginError(true)
      }
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
          onSubmit={(e) => {
            e.preventDefault()
            loginUser()
          }}
          className="shop__form w-45 border border-dark p-3"
        >
          <div className="py-2">
            <h2 class="text-center">Login</h2>
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
            <div className="form__control mb-3 border-0">
              <button className="w-100 py-2" type="submit">
                LOGIN
              </button>
            </div>
            <div className="form__control border-0">
              <button className="w-100 py-2" type="submit">
                <i class="fa fa-google text-light" aria-hidden="true"></i>
                &nbsp; Continue with Google
              </button>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  )
}

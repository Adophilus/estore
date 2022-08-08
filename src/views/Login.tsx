import '../assets/pushable.css'
import '../assets/sliding-color.css'
import Layout from '../components/layout/Layout'
import AppContext from '../contexts/App'
import { useContext, useEffect, useRef, useState } from 'preact/hooks'

export default function () {
  const { pocketBaseClient, Provider } = useContext(AppContext)
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

  const googleOAuth = async () => {
    try {
      const provider = await Provider.use('google', '/auth/google')
      Provider.redirect()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>
      <section className="d-flex flex-column my-5 align-items-center">
        {loginError && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            Invalid email and/or password!
            <button
              type="button"
              className="close"
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
              className="text-center"
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
              <i className="fa fa-user px-3" aria-hidden="true"></i>
              <input
                type="email"
                onChange={(e) => (email.current = e.target.value)}
                placeholder="email"
              />
            </div>
            <div className="form__control mb-3">
              <i className="fa fa-lock px-3" aria-hidden="true"></i>
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
                className="pushable w-100"
                type="button"
                onClick={() => googleOAuth()}
              >
                <span className="shadow"></span>
                <span className="edge"></span>
                <span className="front py-2">
                  <i className="fa fa-google text-light" aria-hidden="true"></i>
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

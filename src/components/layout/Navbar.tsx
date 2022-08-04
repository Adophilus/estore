import AppContext from '../../contexts/App'
import { Link } from 'preact-router/match'
import { useContext } from 'preact/hooks'

export default function () {
  const { cart } = useContext(AppContext)

  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-7">
              <div className="header__top__left">
                <p>Free shipping, 30-day return or refund guarantee.</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-5">
              <div className="header__top__right">
                <div className="header__top__links">
                  <Link href="/login">
                    <i class="fa fa-user" aria-hidden="true"></i>&nbsp; Sign in
                  </Link>
                  <a href="/faqs">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                    &nbsp; FAQs
                  </a>
                </div>
                <div className="header__top__hover">
                  <span>
                    Usd <i className="arrow_carrot-down"></i>
                  </span>
                  <ul>
                    <li>USD</li>
                    <li>EUR</li>
                    <li>USD</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <div className="header__logo d-flex align-items-center">
              <Link href="/">
                <img className="logo" src="/img/logo-black.png" alt="" />
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <nav className="header__menu mobile-menu">
              <ul>
                <li>
                  <Link activeClassName="active" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link activeClassName="active" href="/shop">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link activeClassName="active" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link activeClassName="active" href="/blog">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link activeClassName="active" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3 col-md-3">
            <div className="header__nav__option">
              <a
                onClick={() => $('.search-model').fadeIn(400)}
                className="search-switch"
              >
                <img src="/img/icon/search.png" alt="" />
              </a>
              <Link href="/user/favourites">
                <img src="/img/icon/heart.png" alt="" />
              </Link>
              <Link href="/user/cart">
                <img src="/img/icon/cart.png" alt="" />{' '}
                <span>{cart.items.length}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="canvas__open">
          <i className="fa fa-bars"></i>
        </div>
      </div>
    </header>
  )
}

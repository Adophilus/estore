import AppContext from '../../contexts/App'
import CartIndicator from '../cart/Indicator'
import { Link } from 'preact-router/match'
import { useContext } from 'preact/hooks'

export default function () {
  const { cart } = useContext(AppContext)

  return (
    <section>
      <div
        className="offcanvas-menu-overlay"
        onClick={() => {
          $('.offcanvas-menu-wrapper').removeClass('active')
          $('.offcanvas-menu-overlay').removeClass('active')
        }}
      ></div>
      <div className="offcanvas-menu-wrapper">
        <div className="offcanvas__option">
          <div className="offcanvas__links">
            <Link href="/login">Sign in</Link>
            <Link href="/faqs">FAQs</Link>
          </div>
          <div className="offcanvas__top__hover">
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
        <div className="offcanvas__nav__option">
          <a
            className="search-switch"
            onClick={() => $('.search-model').fadeIn(400)}
          >
            <img src="/img/icon/search.png" alt="" />
          </a>
          <a href="#">
            <img src="/img/icon/heart.png" alt="" />
          </a>
          <Link href="/user/cart">
            <CartIndicator cart={cart} />
          </Link>
        </div>
        <div id="mobile-menu-wrap">
          <div class="slicknav_menu">
            <a
              href="#"
              aria-haspopup="true"
              role="button"
              tabindex="0"
              class="slicknav_btn slicknav_collapsed"
              style="outline: none;"
            >
              <span class="slicknav_menutxt">MENU</span>
              <span class="slicknav_icon">
                <span class="slicknav_icon-bar"></span>
                <span class="slicknav_icon-bar"></span>
                <span class="slicknav_icon-bar"></span>
              </span>
            </a>
            <nav
              class="slicknav_nav slicknav_hidden"
              aria-hidden="true"
              role="menu"
              style="display: none;"
            >
              <ul>
                <li class="active">
                  <Link href="/" role="menuitem">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/shop" role="menuitem">
                    Shop
                  </Link>
                </li>
                <li>
                  <a href="/about" role="menuitem">
                    About
                  </a>
                </li>
                <li>
                  <Link href="/blog" role="menuitem">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" role="menuitem">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="offcanvas__text">
          <p>Free shipping, 30-day return or refund guarantee.</p>
        </div>
      </div>
    </section>
  )
}

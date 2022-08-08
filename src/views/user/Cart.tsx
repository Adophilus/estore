import '../../assets/cart.css'
import '../../assets/pushable.css'
import '../../assets/sliding-color.css'
import Dropdown from '../../components/Dropdown'
import { useCart } from '../../components/hooks/Cart'
import PalletSvg from '../../components/icons/Pallet'
import Layout from '../../components/layout/Layout'
import AppContext from '../../contexts/App'
import { Provider } from '../../utils'
import { Link } from 'preact-router/match'
import { useContext, useEffect, useState } from 'preact/hooks'

export default function () {
  const { pocketBaseClient, cart } = useContext(AppContext)
  const [items, setItems] = useState(null)
  const [allowCheckout, setAllowCheckout] = useState(false)

  const decreaseItem = async (index) => {
    const item = items[index]
    try {
      await cart.updateItem(
        {
          product: item['@expand'].product,
          color: item.color,
          size: item.size,
          quantity: item.quantity - 1
        },
        { $autoCancel: false }
      )
    } catch (err) {
      console.log(err.data)
    }
  }

  const increaseItem = async (index) => {
    const item = items[index]
    await cart.updateItem(
      {
        product: item['@expand'].product,
        color: item.color,
        size: item.size,
        quantity: item.quantity + 1
      },
      { $autoCancel: false }
    )
  }

  const deleteItem = async (index) => {
    const item = items[index]
    await cart.deleteItem(
      {
        product: item['@expand'].product,
        color: item.color,
        size: item.size,
        quantity: item.quantity + 1
      },
      { $autoCancel: false }
    )
  }

  useEffect(() => {
    Promise.all(
      cart.items.map((_item) =>
        pocketBaseClient.Records.getOne('cart_items', _item.id, {
          expand: 'product.cover,size',
          $autoCancel: false
        })
      )
    )
      .then((_items) => setItems(_items))
      .catch((err) => console.log(err.data))
  }, [cart.items])

  if (items === null)
    return (
      <div id="loader">
        <div className="loader"></div>
      </div>
    )

  return (
    <Layout>
      <section className="row">
        <div className="col m-5">
          <div className="row">
            <header>
              <h2>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart
              </h2>
            </header>
          </div>
          <div className="cart__items">
            {items.length ? (
              items.map((item, index) => {
                return (
                  <div className="cart__item row mt-3">
                    <div className="cart__item__image col-3">
                      <img
                        className="h-100"
                        src={`http://localhost:8090/api/files/${item['@expand'].product['@expand'].cover['@collectionId']}/${item['@expand'].product['@expand'].cover.id}/${item['@expand'].product['@expand'].cover.image}`}
                      />
                    </div>
                    <div className="cart__item__desc col gy-1">
                      <div
                        className="d-flex flex-column justify-content-center"
                        style="row-gap: 10px"
                      >
                        <header className="d-flex justify-content-between">
                          <h5 className="font-weight-bolder">
                            {item['@expand'].product.name}
                          </h5>
                          <Dropdown
                            className="cart__item__options__btn"
                            placeholder={
                              <i
                                className="fa fa-ellipsis-h"
                                aria-hidden="true"
                              ></i>
                            }
                            items={[
                              {
                                icon: <i className="fa fa-trash"></i>,
                                text: 'Remove',
                                onClick: () => deleteItem(index)
                              }
                            ]}
                          />
                        </header>
                        <div className="d-flex align-items-center">
                          <div>
                            <span className="cart__item__size">
                              {item['@expand'].size.name}
                            </span>
                            <p className="leader d-inline ml-2">
                              <span className="mr-1">Color:</span>
                              <span
                                className="cart__item__color"
                                style={{ backgroundColor: item.color }}
                              ></span>
                            </p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <header className="h5 mb-0 fw-bolder">
                            $
                            {(
                              item['@expand'].product.price * item.quantity
                            ).toFixed(2)}
                          </header>
                          <div
                            className="cart__item__qty d-flex align-items-center justify-content-center"
                            style={{ columnGap: '20px' }}
                          >
                            <button
                              type="button"
                              onClick={() => decreaseItem(index)}
                              className="cart__item__quantity__btn h4"
                            >
                              -
                            </button>
                            <span className="h5">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => increaseItem(index)}
                              className="cart__item__quantity__btn h4"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="d-flex flex-column align-items-center py-3">
                <i
                  className="fa fa-shopping-cart text-muted"
                  aria-hidden="true"
                  style="font-size: 4rem"
                ></i>
                <h3 className="text-muted">No items in cart!</h3>
              </div>
            )}
          </div>
        </div>
        <div className="cart__checkout__section col-3">
          <div className="sticky-top p-3">
            <header className="cart__subtotal my-3">
              CART TOTAL: <span className="sub__total">$100.00</span>
            </header>
            <span className="cart__disclaimer">
              Shipping and taxes calculated in checkout
            </span>
            <div className="form-check my-5">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={(e) => setAllowCheckout(e.target.checked)}
                id="agreeToTermsAndConditions"
              />
              <label
                className="form-check-label"
                for="agreeToTermsAndConditions"
              >
                I agree to
                <Link href="/termsandconditions">Terms & Conditions</Link>
              </label>
            </div>
            <div>
              <button
                disabled={!allowCheckout || !items.length}
                className="secondary-btn"
              >
                checkout <i className="fa fa-lock" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

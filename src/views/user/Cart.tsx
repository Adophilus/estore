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
  const { pocketBaseClient, cart, config } = useContext(AppContext)
  const [items, setItems] = useState([])
  const [allowCheckout, setAllowCheckout] = useState(false)
  const [loading, setLoading] = useState(true)

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

  const fetchItems = async () => {
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
  }

  useEffect(() => {
    if (cart.init) {
      fetchItems()
    }
  }, [cart.items])

  useEffect(() => {
    return () => setLoading(false)
  }, [items])

  if (loading)
    return (
      <div id="loader">
        <div className="loader"></div>
      </div>
    )

  return (
    <Layout>
      <section>
        <div className="row ml-0 w-100">
          <div className="col m-1 m-sm-5">
            <div className="row">
              <header className="mb-3">
                <h2>
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  &nbsp; <small>Cart</small>
                </h2>
              </header>
            </div>
            <div className="cart__items">
              {items.length ? (
                items.map((item, index) => {
                  return (
                    <div className="cart__item row mt-3">
                      <div className="cart__item__image">
                        <img
                          style="max-width: 100px"
                          src={`${config.pocketBaseHost}/api/files/${item['@expand'].product['@expand'].cover['@collectionId']}/${item['@expand'].product['@expand'].cover.id}/${item['@expand'].product['@expand'].cover.image}`}
                        />
                      </div>
                      <div className="cart__item__desc col d-flex flex-column justify-content-center">
                        <div
                          className="d-flex flex-column"
                          style="row-gap: 10px"
                        >
                          <header className="d-flex justify-content-between">
                            <h5 className="font-weight-bolder fs-3">
                              <Link
                                className="cart__item__name"
                                href={`/shop/products/${item['@expand'].product.slug}`}
                              >
                                {item['@expand'].product.name}
                              </Link>
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
                                  icon: (
                                    <i
                                      class="fa fa-external-link"
                                      aria-hidden="true"
                                    ></i>
                                  ),
                                  text: 'View',
                                  onClick: () =>
                                    window.open(
                                      `/shop/products/${item['@expand'].product.slug}`,
                                      '_blank'
                                    )
                                },
                                {
                                  icon: (
                                    <i
                                      className="fa fa-trash"
                                      aria-hidden="true"
                                    ></i>
                                  ),
                                  text: 'Remove',
                                  onClick: () => deleteItem(index)
                                }
                              ]}
                            />
                          </header>
                          <div className="d-flex align-items-center">
                            <span className="cart__item__size">
                              {item['@expand'].size.name}
                            </span>
                            <span className="d-flex align-items-center ml-2">
                              <span className="mr-1">Color:</span>
                              <span
                                className="cart__item__color"
                                style={{ backgroundColor: item.color }}
                              ></span>
                            </span>
                          </div>
                          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                            <header className="h5 fw-bolder align-self-start align-self-sm-center">
                              $
                              {(
                                item['@expand'].product.price * item.quantity
                              ).toFixed(2)}
                            </header>
                            <div
                              className="cart__item__qty d-flex align-self-end align-items-center justify-content-center"
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
            <div className="d-flex d-lg-none flex-column flex-md-row justify-content-between align-items-center my-5">
              <div className="form-check my-2">
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
                  I agree to&nbsp;
                  <Link className="t__and__c" href="/termsandconditions">
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              <div className="d-flex flex-column justify-content-start">
                <button
                  disabled={!allowCheckout || !items.length}
                  className="primary-btn w-100 w-sm-auto"
                >
                  checkout <i className="fa fa-lock" aria-hidden="true"></i>
                </button>
                <span className="cart__disclaimer">
                  *Shipping and taxes calculated in checkout
                </span>
              </div>
            </div>
          </div>
          <div className="cart__checkout__section col-3 d-none d-lg-block">
            <div className="sticky-top p-3">
              <header className="cart__subtotal my-3">
                CART TOTAL:&nbsp;
                <span className="sub__total">
                  $
                  <span className="sub__total__amount">
                    {(items.length
                      ? items
                          .map(
                            (_item) =>
                              _item['@expand'].product.price * _item.quantity
                          )
                          .reduce((prev, current) => {
                            return prev + current
                          })
                      : 0
                    ).toFixed(2)}
                  </span>
                </span>
              </header>
              <span className="cart__disclaimer">
                *Shipping and taxes calculated in checkout
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
                  I agree to&nbsp;
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
        </div>
      </section>
    </Layout>
  )
}

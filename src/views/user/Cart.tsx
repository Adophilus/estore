import '../../assets/cart.css'
import '../../assets/pushable.css'
import '../../assets/sliding-color.css'
import { useCart } from '../../components/hooks/Cart'
import PalletSvg from '../../components/icons/Pallet'
import Layout from '../../components/layout/Layout'
import AppContext from '../../contexts/App'
import { Provider } from '../../utils'
import { Link } from 'preact-router/match'
import { useContext, useEffect, useState } from 'preact/hooks'

export default function () {
  const { pocketBaseClient, cart } = useContext(AppContext)
  const [items, setItems] = useState([])
  const [allowCheckout, setAllowCheckout] = useState(false)

  const increaseItem = async (index) => {
    const item = items[index]
    await cart.addItem(
      {
        product: item['@expand'].product,
        color: item.color,
        size: item.size,
        quantity: item.quantity + 1
      },
      { $autoCancel: false }
    )
    // item.quantity += 1

    // setItems(
    //   items.map((_item) => {
    //     if (_item.id == item.id) _item.quantity += 1
    //     return _item
    //   })
    // )
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
      .then((_items) => console.log(_items.length) || setItems(_items))
      .catch((err) => console.log(err.data))
  }, [cart.items])

  return (
    <Layout>
      <section className="row">
        <div className="col m-5">
          <div className="row">
            <header className="col">PRODUCT</header>
            <header className="col text-center">PRICE</header>
            <header className="col text-center">QTY</header>
            <header className="col text-center">TOTAL</header>
          </div>
          {items.map((item, index) => {
            return (
              <div className="cart__item">
                <div className="row mt-5">
                  <div className="col">
                    <div className="cart__item__image">
                      <img
                        style={{ width: '100px' }}
                        src={`http://localhost:8090/api/files/${item['@expand'].product['@expand'].cover['@collectionId']}/${item['@expand'].product['@expand'].cover.id}/${item['@expand'].product['@expand'].cover.image}`}
                      />
                      <span class="close__btn">
                        <i class="fa fa-times" aria-hidden="true"></i>
                      </span>
                    </div>
                  </div>
                  <div className="col text-center my-auto font-weight-bold">
                    ${item['@expand'].product.price.toFixed(2)}
                  </div>
                  <div className="col my-auto">
                    <div
                      class="d-flex align-items-center justify-content-center"
                      style={{ columnGap: '20px' }}
                    >
                      <span
                        onClick={() => decreaseItem(index)}
                        className="cart__item__quantity__btn h4"
                      >
                        -
                      </span>
                      <span className="h5">{item.quantity}</span>
                      <span
                        onClick={() => increaseItem(index)}
                        className="cart__item__quantity__btn h4"
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <div className="col text-center my-auto font-weight-bold">
                    $
                    {(item['@expand'].product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                <div className="row">
                  <div className="col d-flex flex-column">
                    <header className="mt-3 h5 font-weight-bolder">
                      {item['@expand'].product.name}
                    </header>
                    <div class="leader">#{item['@expand'].product.sku}</div>
                    <div
                      className="d-flex align-items-center"
                      style="column-gap: 3px"
                    >
                      <span className="cart__item__size">
                        {item['@expand'].size.name}
                      </span>
                      <span>Color:</span>
                      <span
                        className="cart__item__color"
                        style={{ backgroundColor: item.color }}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="cart__checkout__section col-3">
          <div className="sticky-top p-3">
            <header className="cart__subtotal my-3">
              CART TOTAL: <span className="sub__total">$100.00</span>
            </header>
            <span className="cart__disclaimer">
              Shipping and taxes calculated in checkout
            </span>
            <div class="form-check my-5">
              <input
                class="form-check-input"
                type="checkbox"
                onChange={(e) => setAllowCheckout(e.target.checked)}
                id="agreeToTermsAndConditions"
              />
              <label class="form-check-label" for="agreeToTermsAndConditions">
                I agree to
                <Link href="/termsandconditions">Terms & Conditions</Link>
              </label>
            </div>
            <div>
              <button disabled={!allowCheckout} class="secondary-btn">
                checkout <i class="fa fa-lock" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

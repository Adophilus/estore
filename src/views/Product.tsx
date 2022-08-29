import '../assets/favourites.css'
import '../assets/product.css'
import Layout from '../components/layout/Layout'
import ProductPrice from '../components/product/Price'
import ProductRating from '../components/product/Rating'
import AppContext from '../contexts/App'
import { Link } from 'preact-router/match'
import { useContext, useEffect, useRef, useState } from 'preact/hooks'

export default function ({ matches }) {
  const { slug } = matches
  const { pocketBaseClient, cart, favourites, config } = useContext(AppContext)
  const [product, setProduct] = useState(null)
  const [tabImage, setTabImage] = useState(null)
  const currentSize = useRef()
  const currentColor = useRef()
  const [currentQuantity, setCurrentQuantity] = useState(1)
  const [inCart, setInCart] = useState(false)

  const getProduct = async () => {
    const res = await pocketBaseClient.Records.getList('products', 1, 1, {
      filter: `slug = '${slug}'`,
      expand: 'category,images,sizes,tags,stats'
    })
    setTabImage(res.items[0]['@expand'].images[0])
    setProduct(res.items[0])
  }

  const isInCart = () => {
    const color = currentColor.current.getAttribute('_color')
    const size = currentSize.current.getAttribute('_size')
    const _inCart = cart.hasItem({
      product,
      color,
      size
    })
    setInCart(_inCart)
    if (_inCart) {
      setCurrentQuantity(_inCart.quantity)
      return _inCart
    }
    setCurrentQuantity(1)
    return _inCart
  }

  const addToCart = async () => {
    const color = currentColor.current.getAttribute('_color')
    const size = currentSize.current.getAttribute('_size')
    await cart.updateItem({
      product,
      color,
      size,
      currentQuantity
    })
  }

  const decreaseItem = async (index) => {
    const color = currentColor.current.getAttribute('_color')
    const size = currentSize.current.getAttribute('_size')

    await cart.updateItem(
      {
        product: product,
        color: color,
        size: size,
        quantity: currentQuantity - 1
      },
      { $autoCancel: false }
    )
  }

  const increaseItem = async (index) => {
    const color = currentColor.current.getAttribute('_color')
    const size = currentSize.current.getAttribute('_size')

    await cart.updateItem(
      {
        product: product,
        color: color,
        size: size,
        quantity: currentQuantity + 1
      },
      { $autoCancel: false }
    )
  }

  useEffect(() => {
    if (product) {
      isInCart()
    }
  }, [cart.items, product])

  useEffect(() => {
    if (product)
      fetch(`${config.backendUrl}/api/products/analytics/${product.id}`)
  }, [product])

  useEffect(() => {
    getProduct()
  }, [cart.init])

  if (product === null)
    return (
      <div id="loader">
        <div className="loader"></div>
      </div>
    )

  return (
    <Layout>
      <section className="shop-details">
        <div className="product__details__pic">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="product__details__breadcrumb">
                  <Link href="/">Home</Link>
                  <Link href="/shop">Shop</Link>
                  <Link href="/shop">Products</Link>
                  <span>{product.name}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <button
                onClick={() =>
                  (favourites.hasProduct(product) &&
                    favourites.removeProduct(product)) ||
                  favourites.addProduct(product)
                }
                className="favourite__button h3 ml-auto"
              >
                <i
                  className={`fa ${
                    favourites.hasProduct(product) ? 'fa-heart' : 'fa-heart-o'
                  }`}
                  aria-hidden="true"
                ></i>
              </button>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-3">
                <ul className="nav nav-tabs" role="tablist">
                  {product['@expand'].images.map((image, index) => (
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href={`#tabs-${index}`}
                        role="tab"
                        onclick={() => setTabImage(image)}
                      >
                        <div
                          className="product__thumb__pic set-bg"
                          style={`background-image: url('${config.pocketBaseHost}/api/files/${image['@collectionId']}/${image.id}/${image.image}')`}
                        ></div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-6 col-md-9">
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="product__details__pic__item">
                      <img
                        src={`${config.pocketBaseHost}/api/files/${tabImage['@collectionId']}/${tabImage.id}/${tabImage.image}`}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product__details__content">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <div className="product__details__text">
                  <h4>{product.name}</h4>
                  <div
                    style="column-gap: 10px"
                    className="d-flex justify-content-center g-2"
                  >
                    <ProductRating product={product} />
                    <div className="socials d-flex" style="column-gap: 10px">
                      <a
                        href="javascript:void()"
                        onClick={() => {
                          window.open(
                            'https://www.facebook.com/sharer/sharer.php?' +
                              new URLSearchParams({
                                u: `${config.backendUrl}/share/products/${product.slug}`
                              })
                          )
                        }}
                        rel="noopener"
                        target="_blank"
                      >
                        <i
                          class="fa fa-facebook"
                          style="color: #4267B2"
                          aria-hidden="true"
                        ></i>
                      </a>
                      <a
                        href="javascript:void()"
                        onClick={() => {
                          window.open(
                            'https://twitter.com/intent/tweet?' +
                              new URLSearchParams({
                                text: `Check out the ${product.name}\n${config.backendUrl}/share/products/${product.slug}`
                              })
                          )
                        }}
                        rel="noopener"
                        target="_blank"
                      >
                        <i
                          class="fa fa-twitter"
                          style="color: #1da1f2"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </div>
                  </div>
                  <h3>
                    <ProductPrice product={product} />
                  </h3>
                  <p>
                    Coat with quilted lining and an adjustable hood. Featuring
                    long sleeves with adjustable cuff tabs, adjustable
                    asymmetric hem with elastic side tabs and a front zip
                    fastening with placket.
                  </p>
                  <div className="product__details__option">
                    <div className="product__details__option__size">
                      <span>Size:</span>
                      {product['@expand'].sizes.map((size, index) => {
                        let props = {}
                        if (!index) props.ref = currentSize
                        return (
                          <label
                            _size={size.id}
                            onClick={(e) => {
                              if (currentSize.current === e.target) return
                              if (!currentSize.current) {
                                currentSize.current = e.target
                                currentSize.current.classList.add('active')
                                return
                              }
                              currentSize.current.classList.remove('active')
                              currentSize.current = e.target
                              currentSize.current.classList.add('active')
                              isInCart()
                            }}
                            className={`${!index ? 'active' : ''}`}
                            {...props}
                          >
                            {size.name}
                          </label>
                        )
                      })}
                    </div>
                    <div className="product__details__option__color">
                      <span>Color:</span>
                      {product.colors.map((color, index) => {
                        let props = {}
                        if (!index) props.ref = currentColor

                        return (
                          <label
                            _color={color}
                            onClick={(e) => {
                              if (currentColor.current === e.target) return
                              if (!currentColor.current) {
                                currentColor.current = e.target
                                currentColor.current.classList.add('active')
                                return
                              }
                              currentColor.current.classList.remove('active')
                              currentColor.current = e.target
                              currentColor.current.classList.add('active')
                            }}
                            style={{
                              backgroundColor: color
                            }}
                            className={`${!index ? 'active' : ''}`}
                            {...props}
                          ></label>
                        )
                      })}
                    </div>
                  </div>
                  <div className="product__details__cart__option">
                    {inCart && (
                      <button
                        type="button"
                        onClick={() => decreaseItem()}
                        className="product__qty__btn h4"
                        style="margin-right: 20px"
                      >
                        -
                      </button>
                    )}
                    <div className="quantity">
                      <div className="pro-qty">
                        <input
                          type="text"
                          onChange={(e) => setCurrentQuantity(e.target.value)}
                          value={currentQuantity}
                        />
                      </div>
                    </div>
                    {inCart && (
                      <button
                        type="button"
                        onClick={() => increaseItem()}
                        className="product__qty__btn h4"
                      >
                        +
                      </button>
                    )}
                    {!inCart && (
                      <a
                        onClick={() => addToCart()}
                        style="color: #ffffff"
                        className="primary-btn"
                      >
                        add to cart
                      </a>
                    )}
                  </div>

                  <div className="product__details__last__option">
                    <h5>
                      <span>Guaranteed Safe Checkout</span>
                    </h5>
                    <img src="/img/shop-details/details-payment.png" alt="" />
                    <ul>
                      <li>
                        <span>SKU:</span> {product.sku}
                      </li>
                      <li>
                        <span>Category:</span>&nbsp;
                        {product['@expand'].category.name}
                      </li>
                      <li>
                        <span>Tag:</span>&nbsp;
                        {product['@expand'].tags
                          .map((tag) => tag.name)
                          .join(',')}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="product__details__tab">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#tabs-5"
                        role="tab"
                      >
                        Description
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#tabs-6"
                        role="tab"
                      >
                        Customer Reviews (5)
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#tabs-7"
                        role="tab"
                      >
                        Additional information
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane active"
                      id="tabs-5"
                      role="tabpanel"
                    >
                      <div className="product__details__tab__content">
                        <p className="note">
                          Nam tempus turpis at metus scelerisque placerat nulla
                          deumantos solicitud felis. Pellentesque diam dolor,
                          elementum etos lobortis des mollis ut risus. Sedcus
                          faucibus an sullamcorper mattis drostique des commodo
                          pharetras loremos.
                        </p>
                        <div className="product__details__tab__content__item">
                          <h5>Products Infomation</h5>
                          <p>
                            A Pocket PC is a handheld computer, which features
                            many of the same capabilities as a modern PC. These
                            handy little devices allow individuals to retrieve
                            and store e-mail messages, create a contact file,
                            coordinate appointments, surf the internet, exchange
                            text messages and more. Every product that is
                            labeled as a Pocket PC must be accompanied with
                            specific software to operate the unit and must
                            feature a touchscreen and touchpad.
                          </p>
                          <p>
                            As is the case with any new technology product, the
                            cost of a Pocket PC was substantial during it’s
                            early release. For approximately $700.00, consumers
                            could purchase one of top-of-the-line Pocket PCs in
                            2003. These days, customers are finding that prices
                            have become much more reasonable now that the
                            newness is wearing off. For approximately $350.00, a
                            new Pocket PC can now be purchased.
                          </p>
                        </div>
                        <div className="product__details__tab__content__item">
                          <h5>Material used</h5>
                          <p>
                            Polyester is deemed lower quality due to its none
                            natural quality’s. Made from synthetic materials,
                            not natural like wool. Polyester suits become
                            creased easily and are known for not being
                            breathable. Polyester suits tend to have a shine to
                            them compared to wool and cotton suits, this can
                            make the suit look cheap. The texture of velvet is
                            luxurious and breathable. Velvet is a great choice
                            for dinner party jacket and can be worn all year
                            round.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="tabs-6" role="tabpanel">
                      <div className="product__details__tab__content">
                        <div className="product__details__tab__content__item">
                          <h5>Products Infomation</h5>
                          <p>
                            A Pocket PC is a handheld computer, which features
                            many of the same capabilities as a modern PC. These
                            handy little devices allow individuals to retrieve
                            and store e-mail messages, create a contact file,
                            coordinate appointments, surf the internet, exchange
                            text messages and more. Every product that is
                            labeled as a Pocket PC must be accompanied with
                            specific software to operate the unit and must
                            feature a touchscreen and touchpad.
                          </p>
                          <p>
                            As is the case with any new technology product, the
                            cost of a Pocket PC was substantial during it’s
                            early release. For approximately $700.00, consumers
                            could purchase one of top-of-the-line Pocket PCs in
                            2003. These days, customers are finding that prices
                            have become much more reasonable now that the
                            newness is wearing off. For approximately $350.00, a
                            new Pocket PC can now be purchased.
                          </p>
                        </div>
                        <div className="product__details__tab__content__item">
                          <h5>Material used</h5>
                          <p>
                            Polyester is deemed lower quality due to its none
                            natural quality’s. Made from synthetic materials,
                            not natural like wool. Polyester suits become
                            creased easily and are known for not being
                            breathable. Polyester suits tend to have a shine to
                            them compared to wool and cotton suits, this can
                            make the suit look cheap. The texture of velvet is
                            luxurious and breathable. Velvet is a great choice
                            for dinner party jacket and can be worn all year
                            round.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="tabs-7" role="tabpanel">
                      <div className="product__details__tab__content">
                        <p className="note">
                          Nam tempus turpis at metus scelerisque placerat nulla
                          deumantos solicitud felis. Pellentesque diam dolor,
                          elementum etos lobortis des mollis ut risus. Sedcus
                          faucibus an sullamcorper mattis drostique des commodo
                          pharetras loremos.
                        </p>
                        <div className="product__details__tab__content__item">
                          <h5>Products Infomation</h5>
                          <p>
                            A Pocket PC is a handheld computer, which features
                            many of the same capabilities as a modern PC. These
                            handy little devices allow individuals to retrieve
                            and store e-mail messages, create a contact file,
                            coordinate appointments, surf the internet, exchange
                            text messages and more. Every product that is
                            labeled as a Pocket PC must be accompanied with
                            specific software to operate the unit and must
                            feature a touchscreen and touchpad.
                          </p>
                          <p>
                            As is the case with any new technology product, the
                            cost of a Pocket PC was substantial during it’s
                            early release. For approximately $700.00, consumers
                            could purchase one of top-of-the-line Pocket PCs in
                            2003. These days, customers are finding that prices
                            have become much more reasonable now that the
                            newness is wearing off. For approximately $350.00, a
                            new Pocket PC can now be purchased.
                          </p>
                        </div>
                        <div className="product__details__tab__content__item">
                          <h5>Material used</h5>
                          <p>
                            Polyester is deemed lower quality due to its none
                            natural quality’s. Made from synthetic materials,
                            not natural like wool. Polyester suits become
                            creased easily and are known for not being
                            breathable. Polyester suits tend to have a shine to
                            them compared to wool and cotton suits, this can
                            make the suit look cheap. The texture of velvet is
                            luxurious and breathable. Velvet is a great choice
                            for dinner party jacket and can be worn all year
                            round.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="related spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="related-title">Related Product</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  style="background-image: url('/img/product/product-1.jpg')"
                >
                  <span className="label">New</span>
                  <ul className="product__hover">
                    <li>
                      <a href="#">
                        <img src="/img/icon/heart.png" alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="/img/icon/compare.png" alt="" />{' '}
                        <span>Compare</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="/img/icon/search.png" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>Piqué Biker Jacket</h6>
                  <a href="#" className="add-cart">
                    + Add To Cart
                  </a>
                  <div className="rating">
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                  </div>
                  <h5>$67.24</h5>
                  <div className="product__color__select">
                    <label for="pc-1">
                      <input type="radio" id="pc-1" />
                    </label>
                    <label className="active black" for="pc-2">
                      <input type="radio" id="pc-2" />
                    </label>
                    <label className="grey" for="pc-3">
                      <input type="radio" id="pc-3" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  style="background-image: url('/img/product/product-2.jpg')"
                >
                  <ul className="product__hover">
                    <li>
                      <a href="#">
                        <img src="/img/icon/heart.png" alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="/img/icon/compare.png" alt="" />{' '}
                        <span>Compare</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="/img/icon/search.png" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>Piqué Biker Jacket</h6>
                  <a href="#" className="add-cart">
                    + Add To Cart
                  </a>
                  <div className="rating">
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                  </div>
                  <h5>$67.24</h5>
                  <div className="product__color__select">
                    <label for="pc-4">
                      <input type="radio" id="pc-4" />
                    </label>
                    <label className="active black" for="pc-5">
                      <input type="radio" id="pc-5" />
                    </label>
                    <label className="grey" for="pc-6">
                      <input type="radio" id="pc-6" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-sm-6">
              <div className="product__item sale">
                <div
                  className="product__item__pic set-bg"
                  style="background-image: url('/img/product/product-3.jpg')"
                >
                  <span className="label">Sale</span>
                  <ul className="product__hover">
                    <li>
                      <a href="#">
                        <img src="/img/icon/heart.png" alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="/img/icon/compare.png" alt="" />{' '}
                        <span>Compare</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="/img/icon/search.png" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>Multi-pocket Chest Bag</h6>
                  <a href="#" className="add-cart">
                    + Add To Cart
                  </a>
                  <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                  </div>
                  <h5>$43.48</h5>
                  <div className="product__color__select">
                    <label for="pc-7">
                      <input type="radio" id="pc-7" />
                    </label>
                    <label className="active black" for="pc-8">
                      <input type="radio" id="pc-8" />
                    </label>
                    <label className="grey" for="pc-9">
                      <input type="radio" id="pc-9" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  style="background-image: url('/img/product/product-4.jpg')"
                >
                  <ul className="product__hover">
                    <li>
                      <a href="#">
                        <img src="/img/icon/heart.png" alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="/img/icon/compare.png" alt="" />{' '}
                        <span>Compare</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="/img/icon/search.png" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>Diagonal Textured Cap</h6>
                  <a href="#" className="add-cart">
                    + Add To Cart
                  </a>
                  <div className="rating">
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                  </div>
                  <h5>$60.9</h5>
                  <div className="product__color__select">
                    <label for="pc-10">
                      <input type="radio" id="pc-10" />
                    </label>
                    <label className="active black" for="pc-11">
                      <input type="radio" id="pc-11" />
                    </label>
                    <label className="grey" for="pc-12">
                      <input type="radio" id="pc-12" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

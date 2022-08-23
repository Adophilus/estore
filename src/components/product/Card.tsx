import '../../assets/product.css'
import AppContext from '../../contexts/App'
import { Link } from 'preact-router/match'
import { useContext, useEffect, useRef, useState } from 'preact/hooks'

export default function ({ product }) {
  const { cart, favourites, pocketBaseClient, config } = useContext(AppContext)
  const activeColor = useRef()
  const [stats, setStats] = useState({ sale: { discount: 0 } })

  const addToCart = async () => {
    try {
      await cart.updateItem({
        product,
        color: activeColor.current.style.backgroundColor,
        size: product.sizes[0]
      })
    } catch (err) {
      console.log(err)
      console.log(err.data)
    }
  }

  const getProductStats = async () => {
    setStats(
      await pocketBaseClient.Records.getOne('product_stats', product.stats)
    )
  }

  useEffect(() => {
    if (product.onSale) getProductStats()
  }, [])

  return (
    <div className="product__item__wrapper">
      <div className={`product__item ${product.onSale && 'sale'}`}>
        <div
          className="product__item__pic set-bg"
          style={{
            backgroundImage: `url('${config.pocketBaseHost}/api/files/${product['@expand'].cover['@collectionId']}/${product['@expand'].cover.id}/${product['@expand'].cover.image}')`
          }}
        >
          {product.onSale && (
            <div className="sale">
              <span className="notif-black">Sale</span>
              <span className="notif-red">-{stats.sale.discount}%</span>
            </div>
          )}
          <ul className="product__hover">
            <li>
              <a
                className="tab"
                onClick={() =>
                  (favourites.hasProduct(product) &&
                    favourites.removeProduct(product)) ||
                  favourites.addProduct(product)
                }
              >
                <i
                  className={`fa ${
                    favourites.hasProduct(product) ? 'fa-heart' : 'fa-heart-o'
                  }`}
                  aria-hidden="true"
                ></i>
                <span>
                  {(favourites.hasProduct(product) && 'Unfavourite') ||
                    'Favourite'}
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/img/icon/compare.png" alt="Compare" />
                <span>Compare</span>
              </a>
            </li>
            <li>
              <Link href={`/shop/products/${product.slug}`}>
                <img src="/img/icon/search.png" alt="View" />
                <span>View</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="product__item__text">
          <h6>{product.name}</h6>
          <a onClick={() => addToCart()} className="add-cart">
            + Add To Cart
          </a>
          <div className="rating">
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
          </div>
          <h5>
            {product.onSale ? (
              <>
                <small>
                  <del>
                    {'$'}
                    {product.price.toFixed(2)}
                  </del>
                </small>
                &nbsp;
                {'$'}
                {((product.price * (100 - stats.sale.discount)) / 100).toFixed(
                  2
                )}
              </>
            ) : (
              `$${product.price.toFixed(2)}`
            )}
          </h5>
          <div className="product__color__select">
            {product.colors.map((color, index) => (
              <label
                ref={!index ? activeColor : null}
                className={`${index === 0 ? 'active' : ''}`}
                onClick={(e) => {
                  if (activeColor.current)
                    activeColor.current.classList.remove('active')
                  e.target.classList.add('active')
                  activeColor.current = e.target
                }}
                style={{ backgroundColor: color }}
                for={`pc-${index}`}
              >
                <input type="radio" id={`pc-${index}`} />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

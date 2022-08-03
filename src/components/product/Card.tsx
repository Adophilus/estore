import AppContext from '../../contexts/App'
import { Link } from 'preact-router/match'
import { useContext, useRef } from 'preact/hooks'

export default function ({ product }) {
  const activeColor = useRef()
  const { cart } = useContext(AppContext)

  const addToCart = async () => {
    try {
      await cart.addItem({
        product,
        color: activeColor.current.style.backgroundColor,
        size: product.sizes[0]
      })
      console.log('all done!')
    } catch (err) {
      console.log(err)
      console.log(err.data)
    }
  }

  return (
    <div className="product__item">
      <div
        className="product__item__pic set-bg"
        style={{
          backgroundImage: `url('http://localhost:8090/api/files/${product['@expand'].cover['@collectionId']}/${product['@expand'].cover.id}/${product['@expand'].cover.image}')`
        }}
      >
        <ul className="product__hover">
          <li>
            <a href="#">
              <img src="/img/icon/heart.png" alt="Favourite" />
              <span>Favourite</span>
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
        <h5>${product.price.toFixed(2)}</h5>
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
  )
}

import Link from 'next/Link'
import ShoppingCartIcon from '../icons/ShoppingCart'
import FavouriteButton from '../favourite/Button'

export default ({ product, store, cart, favourites }) => {
  const { name, price, slug, images } = product

  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <span className="block relative h-48 rounded overflow-hidden">
        <Link href={`/products/${slug}`}>
          <a>
            <img
              alt="ecommerce"
              className="object-cover object-center w-full h-full block"
              src={`/product-images/${images[0]}`}
            />
          </a>
        </Link>
      </span>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          CATEGORY
        </h3>
        <Link href={`/products/${slug}`}>
          <a>
            <h2 className="text-gray-900 title-font text-lg font-medium">
              {name}
            </h2>
          </a>
        </Link>
        <p className="mt-1">${price}</p>
      </div>
      <div className="mt-4 flex">
        <button
          onClick={() => cart.addItem({ product })}
          className="flex flex-grow justify-center text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primaryHover rounded"
        >
          <ShoppingCartIcon className="w-6 h-6" />
          Add to cart
        </button>
        <FavouriteButton product={product} favourites={favourites} />
      </div>
    </div>
  )
}

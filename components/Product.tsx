import Link from 'next/Link'
import ShoppingCartIcon from './icons/ShoppingCart.tsx'

export default ({ product, store }) => {
  const { name, price, slug, cover } = product

  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <span className="block relative h-48 rounded overflow-hidden">
        <Link href={`/products/${slug}`}>
          <a>
            <img
              alt="ecommerce"
              className="object-cover object-center w-full h-full block"
              src={`/product-images/${cover[0]}`}
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
      <div className="mt-4">
        <button
          onClick={function () {
            let newStore = { ...store.state }
            newStore.cart[product.slug] = store.state.cart[product.slug]
              ? store.state.cart[product.slug]++
              : 1
            store.set(newStore)
          }}
          className="flex justify-center w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
        >
          <ShoppingCartIcon className="w-6 h-6" />
          Add to cart
        </button>
      </div>
    </div>
  )
}

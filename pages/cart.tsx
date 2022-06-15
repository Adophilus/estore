import MainLayout from '../components/layouts/main/Layout'
import CartProduct from '../components/cart/Product'
import CheckoutIcon from '../components/icons/Checkout'
import Link from 'next/link'
import db from '../database.json'

export default ({ store, cart }) => {
  const cartItems = cart.getItems()

  return (
    <MainLayout store={store} cart={cart}>
      <section className="text-gray-600 body-font overflow-hidden w-2/3 mx-auto">
        <div className="container px-5 mx-auto md:py-24">
          <div className="flex flex-col gap-y-4 divide-y-2 divide-gray-100">
            {Object.keys(cartItems).map((_cartProduct) => {
              const product = db.products.find(
                (_product) => _product.slug === _cartProduct
              )
              if (product)
                return cartItems[product.slug].map((_variant, index) => (
                  <CartProduct
                    key={index}
                    cart={cart}
                    store={store}
                    product={product}
                    color={_variant.color}
                    size={_variant.size}
                    qty={_variant.qty}
                  />
                ))
            })}
          </div>
          <div className="flex justify-end mt-6 divide-y-2 divide-gray-100">
            <Link href="/cart/checkout">
              <button className="flex gap-x-2 uppercase text-white bg-indigo-500 border-0 hover:bg-primaryHover rounded shadow-md font-medium py-3 px-3">
                <CheckoutIcon className="w-6 h-6" />
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

import MainLayout from '../components/layouts/main/Layout'
import CartProduct from '../components/cart/Product'
import db from '../database.json'

export default ({ store, cart }) => {
  return (
    <MainLayout store={store} cart={cart}>
      <section className="text-gray-600 body-font overflow-hidden w-2/3 mx-auto">
        <div className="container px-5 mx-auto md:py-24">
          <div className="flex flex-col gap-y-4 divide-y-2 divide-gray-100">
            {Object.keys(cart.getItems()).map((product, index) => (
              <CartProduct
                key={index}
                cart={cart}
                store={store}
                product={db.products.find((_product) => _product.slug === product)}
              />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

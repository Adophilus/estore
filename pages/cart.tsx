import MainLayout from '../components/layouts/main/Layout'
import CartProduct from '../components/cart/Product'
import db from '../database.json'

export default ({ store, cart }) => {
  return (
    <MainLayout store={store} cart={cart}>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            {Object.keys(cart.getItems()).map((product, index) => (
              <CartProduct
                key={index}
                store={store}
                product={db.products.find((_product) => {
                  console.log(_product.slug, product)
                  console.log(_product.slug === product)
                  return _product.slug === product
                })}
              />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

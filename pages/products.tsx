import Head from 'next/head'
import db from '../database.json'
import StoreLayout from '../components/layouts/store/Layout'
import Product from '../components/Product'

export default () => {
  return (
    <StoreLayout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object(db.products).map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
        </div>
      </section>
    </StoreLayout>
  )
}

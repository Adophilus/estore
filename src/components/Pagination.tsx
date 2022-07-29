export default function ({ products }) {
  return (
    <div className="col-lg-12">
      <div className="product__pagination">
        <a className="active" href="#">
          1
        </a>
        {products.page === 1 &&
          [1, 2].map((index) => <a href="#">{products.page + index}</a>)}
      </div>
    </div>
  )
}

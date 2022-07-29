import { DOTS, usePagination } from './usePagination'

export default function ({ products, onPageChange }) {
  // return (
  //   <div className="col-lg-12">
  //     <div className="product__pagination">
  //       <a className="active" href="#">
  //         1
  //       </a>
  //       {products.page === 1 &&
  //         [1, 2].map((index) => <a href="#">{products.page + index}</a>)}
  //     </div>
  //   </div>
  // )
  const paginationRange = usePagination({
    currentPage: products.page,
    totalCount: products.totalItems,
    pageSize: products.perPage
  })
  if (paginationRange.length < 2) {
    return null
  }
  const onNext = () => {
    onPageChange(products.page + 1)
  }

  const onPrevious = () => {
    onPageChange(products.page - 1)
  }
  console.log(paginationRange)
  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <div className="col-lg-12">
      <div className="product__pagination">
        <span
          style="cursor: pointer"
          className={`${products.page === 1 ? 'text-muted' : ''}`}
          onClick={() => products.page !== 1 && onPrevious()}
        >
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </span>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <span>&#8230;</span>
          }

          return (
            <a
              className={`${products.page === pageNumber ? 'active' : ''}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </a>
          )
        })}
        <span
          style="cursor: pointer"
          className={`${products.page === lastPage ? 'text-muted' : ''}`}
          onClick={() => products.page !== lastPage && onNext()}
        >
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  )
}

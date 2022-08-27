import Pagination from '../components/Pagination'
import Layout from '../components/layout/Layout'
import ProductCard from '../components/product/Card'
import AppContext from '../contexts/App'
import { route } from 'preact-router'
import { Link } from 'preact-router/match'
import { useContext, useEffect, useRef, useState } from 'preact/hooks'

export default function () {
  const queryParams = new URLSearchParams(window.location.search)
  const search = {
    name: queryParams.get('name') || '',
    categories:
      new Set((queryParams.get('categories') || '').split(',')) || new Set(),
    minPrice: Number(queryParams.get('minPrice')) || 0,
    maxPrice: Number(queryParams.get('minPrice')) || 1000,
    tags: new Set((queryParams.get('tags') || '').split(',')) || new Set(),
    sizes: new Set((queryParams.get('sizes') || '').split(',')) || new Set(),
    page: Number(queryParams.get('page')) || 1
  }
  const { pocketBaseClient } = useContext(AppContext)
  const [products, setProducts] = useState()
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [sizes, setSizes] = useState([])
  const selectRef = useRef()

  // execute this function when the search button is clicked
  const searchForProduct = (e) => {
    if (e) e.preventDefault()

    let localSearch = { ...search }
    localSearch.categories = Array.from(localSearch.categories)
    localSearch.tags = Array.from(localSearch.tags)
    localSearch.sizes = Array.from(localSearch.sizes)
    window.location.href = `?${Object.keys(localSearch)
      .map((key) => `${key}=${window.encodeURIComponent(localSearch[key])}`)
      .join('&')}`
  }

  const onPageChange = (pageNumber) => {
    search.page = pageNumber
    searchForProduct()
  }

  const getDetails = async () => {
    let filter = `trending > 0 && name ~ '${search.name}' && price >= ${search.minPrice} && price <= ${search.maxPrice} `
    for (let category of search.categories) {
      filter += `&& category.name ~ '${category}' `
    }
    for (let tag of search.tags) {
      filter += `&& tags.name ~ '${tag}' `
    }
    for (let size of search.sizes) {
      filter += `&& sizes.name ~ '${size}' `
    }
    let res = await pocketBaseClient.Records.getList(
      'products',
      search.page,
      30,
      {
        $autoCancel: false,
        filter,
        sort: '-trending',
        expand: 'cover'
      }
    )
    setProducts(res)

    res = await pocketBaseClient.Records.getFullList('product_categories', 10, {
      $autoCancel: false
    })
    setCategories(res)

    res = await pocketBaseClient.Records.getFullList('product_tags', 10, {
      $autoCancel: false
    })
    setTags(res)

    res = await pocketBaseClient.Records.getFullList('product_sizes', 10, {
      $autoCancel: false
    })
    setSizes(res)
  }

  useEffect(() => {
    getDetails()
  }, [])

  if (sizes.length === 0)
    return (
      <div id="loader">
        <div className="loader"></div>
      </div>
    )

  return (
    <Layout>
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Trending</h4>
                <div className="breadcrumb__links">
                  <Link href="/">Home</Link>
                  <Link href="/shop">Shop</Link>
                  <span>Trending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shop spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="shop__sidebar">
                <div className="shop__sidebar__search">
                  <form onSubmit={(e) => searchForProduct(e)}>
                    <input
                      type="text"
                      value={search.name}
                      onChange={(e) => (search.name = e.target.value)}
                      placeholder="Search..."
                    />
                    <button type="submit">
                      <span className="icon_search"></span>
                    </button>
                  </form>
                </div>
                <div className="shop__sidebar__accordion">
                  <div className="accordion" id="accordionExample">
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseOne">
                          Categories
                        </a>
                      </div>
                      <div
                        id="collapseOne"
                        className="collapse"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__categories">
                            <ul className="nice-scroll">
                              {categories.map((category, index) => (
                                <li>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={`category-${index}`}
                                      checked={search.categories.has(
                                        category.name
                                      )}
                                      onChange={(e) =>
                                        e.target.checked
                                          ? search.categories.add(category.name)
                                          : search.categories.delete(
                                              category.name
                                            )
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      for={`category-${index}`}
                                    >
                                      {category.name}
                                    </label>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseThree">
                          Filter Price
                        </a>
                      </div>
                      <div
                        id="collapseThree"
                        className="collapse"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__price">
                            <form className="row d-flex flex-column flex-md-row justify-content-center p-1 px-3">
                              <div className="flex-grow-1 p-1">
                                <input
                                  className="w-100"
                                  type="number"
                                  placeholder="MIN"
                                  onChange={(e) =>
                                    (search.minPrice = e.target.value)
                                  }
                                  value={search.minPrice}
                                />
                              </div>
                              <div className="flex-grow-1 p-1">
                                <input
                                  className="w-100"
                                  type="number"
                                  placeholder="MAX"
                                  onChange={(e) =>
                                    (search.maxPrice = e.target.value)
                                  }
                                  value={search.maxPrice}
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseFour">
                          Size
                        </a>
                      </div>
                      <div
                        id="collapseFour"
                        className="collapse"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__size">
                            {sizes.map((size) => (
                              <label
                                className={`${
                                  search.sizes.has(size.name) ? 'active' : ''
                                }`}
                                onClick={(e) => {
                                  search.sizes.has(size.name)
                                    ? search.sizes.delete(size.name) &&
                                      e.target.classList.remove('active')
                                    : search.sizes.add(size.name) &&
                                      e.target.classList.add('active')
                                }}
                              >
                                {size.name}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseSix">
                          Tags
                        </a>
                      </div>
                      <div
                        id="collapseSix"
                        className="collapse"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__tags">
                            {tags.map((tag) => (
                              <span
                                className={`${
                                  search.tags.has(tag.name) ? 'active' : ''
                                }`}
                                onClick={(e) => {
                                  search.tags.has(tag.name)
                                    ? search.tags.delete(tag.name) &&
                                      e.target.classList.remove('active')
                                    : search.tags.add(tag.name) &&
                                      e.target.classList.add('active')
                                }}
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              {products.items.length ? (
                <>
                  <div className="shop__product__option">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="shop__product__option__left">
                          <p>
                            Showing {(products.page - 1) * products.perPage + 1}{' '}
                            – {Math.min(products.totalItems, products.perPage)}{' '}
                            of {products.totalItems} results
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="shop__product__option__right">
                          <p>Sort by:</p>
                          <select ref={selectRef} className="nice-select">
                            <option value="alphabetical">A-Z</option>
                            <option value="low-to-high">Most Popular</option>
                            <option value="low-to-high">Low To High</option>
                            <option value="high-to-low">High To Low</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {products.items.map((product, index) => (
                      <div className="col-lg-4 col-md-6 col-sm-6">
                        <ProductCard key={index} product={product} />
                      </div>
                    ))}
                  </div>
                  <div className="row">
                    <Pagination
                      products={products}
                      onPageChange={onPageChange}
                    />
                  </div>
                </>
              ) : (
                <div className="d-flex flex-column align-items-center py-3">
                  <i
                    className="fa fa-archive text-muted"
                    aria-hidden="true"
                    style="font-size: 4rem"
                  ></i>
                  <h3 className="text-muted">No products found!</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
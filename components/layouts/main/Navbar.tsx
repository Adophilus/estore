import SearchIcon from '../../icons/Search'
import ShoppingCartIcon from '../../icons/ShoppingCart'
import NavLink from './navbar/Link'

export default ({ store }) => {
  return (
    <header className="text-gray-600 body-font navbar">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Estore</span>
        </a>
        <nav className="flex gap-x-3 md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/featured">Featured</NavLink>
          <NavLink to="/best-deals">Best Deals</NavLink>
        </nav>
        <div className="flex gap-x-3">
          <div className="flex search-btn hover:gap-x-3 hover:cursor-pointer duration-200 items-center justify-center text-white bg-indigo-500 border-0 w-14 h-14 rounded-full">
            <SearchIcon className="w-6 h-6 search-icon" />
            <input
              type="text"
              className="bg-transparent w-0 py-1 focus:outline-none border-b-2 border-b-white search-input"
            />
          </div>
          <div className="flex items-center relative hover:cursor-pointer justify-center text-white bg-indigo-500 border-0 w-14 h-14 hover:bg-indigo-600 rounded-full">
            <ShoppingCartIcon className="w-6 h-6" />
            {Object.keys(store.state.cart).length > 0 ? (
              <span className="bg-red-600 text-white absolute -top-1 -right-1 text-sm font-semibold flex items-center justify-center h-6 w-6 rounded-full dark:bg-blue-200 dark:text-blue-800">
                {Object.keys(store.state.cart).length}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}

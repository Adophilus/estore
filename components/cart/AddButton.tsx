import ShoppingCartIcon from '../icons/ShoppingCart'

export default ({ cart, product, color, size }) => {
  if (cart.hasItem({ product, color, size }))
    return (
      <div>
        <span>-</span>
        <span>qty</span>
        <span>+</span>
      </div>
    )
  else
    return (
      <button
        onClick={() => cart.addItem({ product, color, size })}
        className="flex flex-grow justify-center text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primaryHover rounded"
      >
        <ShoppingCartIcon className="w-6 h-6" />
        Add to cart
      </button>
    )
}

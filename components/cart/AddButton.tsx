import ShoppingCartIcon from '../icons/ShoppingCart'
import PlusIcon from '../icons/Plus'
import MinusIcon from '../icons/Minus'

export default ({ cart, product, color, size }) => {
  if (cart.hasItem({ product, color, size }))
    return (
      <div className="flex gap-x-6 items-center">
            <button onClick={() => cart.removeItem({ product, color, size })} className="flex justify-center w-full text-white bg-indigo-500 border-0 hover:bg-primaryHover rounded shadow-md py-1 px-1">
              <MinusIcon className="w-6 h-6" />
            </button>
            <span className="text-xl">
              {cart.numberOfProducts({ product, color, size})}
            </span>
            <button onClick={() => cart.addItem({ product, color, size })} className="flex justify-center w-full text-white bg-indigo-500 border-0 hover:bg-primaryHover rounded shadow-md py-1 px-1">
              <PlusIcon className="w-6 h-6" />
            </button>
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

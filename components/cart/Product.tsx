import PlusIcon from '../icons/Plus'
import MinusIcon from '../icons/Minus'
import TrashIcon from '../icons/Trash'

export default ({ product, store, cart }) => {
  return (
    <div className="flex gap-x-5">
      <img className="w-1/4" src={`/product-images/${product.images[0]}`} />
      <div className="flex flex-col flex-grow">
        <div className="flex flex-col">
          <span>CATEGORY</span>
          <header class="text-3xl">{product.name}</header>
        </div>
        <div className="flex gap-x-3">
          <span>{product.color} black</span>
          <span>{product.size} LG</span>
        </div>
        <div className="flex mt-auto justify-between">
          <div>
            <button onClick={() => cart.removeItem(product)} className="flex justify-center w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-primaryHover rounded">
              <TrashIcon className="w-6 h-6" />
              Remove
            </button>
          </div>
          <div className="flex gap-x-6 items-center">
            <button className="flex justify-center w-full text-white bg-indigo-500 border-0 hover:bg-primaryHover rounded shadow-md py-1 px-1">
              <MinusIcon className="w-6 h-6" />
            </button>
            <span className="text-xl">
              {cart.numberOfProducts({ product, color, size})}
            </span>
            <button className="flex justify-center w-full text-white bg-indigo-500 border-0 hover:bg-primaryHover rounded shadow-md py-1 px-1">
              <PlusIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-2xl">${product.price}</span>
      </div>
    </div>
  )
}

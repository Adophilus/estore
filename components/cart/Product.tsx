import CheckIcon from '../icons/Check'
import PlusIcon from '../icons/Plus'
import MinusIcon from '../icons/Minus'
import TrashIcon from '../icons/Trash'
import AddToCartButton from './AddButton'
import { Cart } from '../../types/Cart'
import { ProductDetails } from '../../types/Product'
import { Store } from '../../types/Store'

type Props = ProductDetails & {
  qty: Number
  cart: Cart
  store: Store
  onRemoved: () => null
}

export default ({
  product,
  color,
  size,
  qty,
  store,
  cart,
  onRemoved
}: Props) => {
  return (
    <div className="flex gap-x-5">
      <img className="w-1/4" src={`/product-images/${product.images[0]}`} />
      <div className="flex flex-col flex-grow">
        <div className="flex flex-col">
          <span>CATEGORY</span>
          <header className="text-3xl">{product.name}</header>
        </div>
        <div className="flex gap-x-3 items-center flex-grow">
          <div
            style={{
              backgroundColor: color
            }}
            className="product-color drop-shadow-md w-20"
          >
            <input
              type="radio"
              id="productColor"
              className="hidden"
              defaultChecked={true}
              value={color}
            />
            <label
              htmlFor="productColor"
              className="w-full h-full py-2 flex justify-center items-center rounded cursor-pointer duration-200"
            >
              <span className="flex invisible rounded-full w-100 h-100 text-white bg-primary ">
                <span className="w-6 h-6 text-bold">
                  <CheckIcon />
                </span>
              </span>
            </label>
          </div>
          <div className="product-size">
            <input
              type="radio"
              id="productSize"
              className="hidden"
              defaultChecked={true}
              value={size}
            />
            <label
              htmlFor="productSize"
              className="py-1 px-2 uppercase border-2 border-primary rounded font-semibold text-primary cursor-pointer duration-200 hover:bg-primary hover:text-white"
            >
              {size}
            </label>
          </div>
        </div>
        <div className="flex mt-auto justify-between">
          <div>
            <button
              onClick={() =>
                cart.deleteItem({ product, color, size }) && onRemoved()
              }
              className="flex justify-center w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-primaryHover rounded"
            >
              {' '}
              <span className="w-6 h-6">
                <TrashIcon />
              </span>
              Remove
            </button>
          </div>
          <div className="ml-auto">
            <AddToCartButton
              cart={cart}
              product={product}
              color={color}
              size={size}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-2xl">{`$${product.price}`}</span>
      </div>
    </div>
  )
}

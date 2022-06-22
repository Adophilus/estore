import ShoppingCartIcon from '../icons/ShoppingCart'
import PlusIcon from '../icons/Plus'
import MinusIcon from '../icons/Minus'
import { Cart } from '../../types/Cart'
import { ProductDetails } from '../../types/Product'
import type { ReactNode } from 'react'

type Props = ProductDetails & {
  cart: Cart
}

export default ({ cart, product, color, size }: Props) => {
  if (cart.hasItem({ product, color, size }))
    return (
      <div className="flex gap-x-6 items-center">
        <button
          onClick={() => cart.removeItem({ product, color, size })}
          className="flex justify-center w-full text-white bg-indigo-500 border-0 hover:bg-primaryHover rounded shadow-md py-1 px-1"
        >
          <span className="w-6 h-6">
            <MinusIcon />
          </span>
        </button>
        <span className="text-xl">
          {cart.numberOfProducts({ product, color, size }) as ReactNode}
        </span>
        <button
          onClick={() => cart.addItem({ product, color, size })}
          className="flex justify-center w-full text-white bg-indigo-500 border-0 hover:bg-primaryHover rounded shadow-md py-1 px-1"
        >
          <span className="w-6 h-6">
            <PlusIcon />
          </span>
        </button>
      </div>
    )
  else
    return (
      <button
        onClick={() => cart.addItem({ product, color, size })}
        className="flex flex-grow justify-center text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primaryHover rounded"
      >
        <span className="w-6 h-6">
          <ShoppingCartIcon />
        </span>
        Add to cart
      </button>
    )
}

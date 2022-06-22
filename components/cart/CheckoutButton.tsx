import CheckoutIcon from '../icons/Checkout'
import { Cart } from '../../types/Cart'

export default ({ cart }: { cart: Cart }) => {
  return (
    <button
      onClick={() => {
        cart.checkout()
      }}
      className="flex gap-x-2 uppercase text-white bg-indigo-500 border-0 hover:bg-primaryHover rounded shadow-md font-medium py-3 px-3"
    >
      <span className="w-6 h-6">
        <CheckoutIcon />
      </span>
      Checkout
    </button>
  )
}

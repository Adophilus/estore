import CheckoutIcon from '../icons/Checkout'

export default ({ cart }) => {
  return (
    <button
      onClick={() => {
        cart.checkout()
      }}
      className="flex gap-x-2 uppercase text-white bg-indigo-500 border-0 hover:bg-primaryHover rounded shadow-md font-medium py-3 px-3"
    >
      <CheckoutIcon className="w-6 h-6" />
      Checkout
    </button>
  )
}

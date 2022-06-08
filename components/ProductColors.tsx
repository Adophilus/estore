import CheckIcon from './icons/Check'

export default ({ product }) => {
  return (
    <div className="flex gap-x-2">
      {product.colors.map((color, index) => (
        <div className="product-color">
          <input
            type="radio"
            id={`productColor${index}`}
            name="product_color"
            className="hidden"
          />
          <label
            for={`productColor${index}`}
            className={`py-1 px-2 uppercase border-2 border-grey-300 rounded bg-[${color}] cursor-pointer duration-200`}
          >
            <span className="flex justify-center items-center rounded-full text-white bg-black">
              <CheckIcon className="w-6 h-6" />
            </span>
          </label>
        </div>
      ))}
    </div>
  )
}

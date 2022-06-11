import CheckIcon from './icons/Check'

export default ({ product }) => {
  return (
    <div className="flex gap-x-2">
      {product.colors.map((color, index) => (
        <div key={index} className="product-color drop-shadow-md w-20" bg-col={color}>
          <input
            type="radio"
            id={`productColor${index}`}
            name="product_color"
            className="hidden"
          />
          <label
            htmlFor={`productColor${index}`}
            className={`w-full h-full py-2 flex justify-center items-center rounded cursor-pointer duration-200`}
          >
            <span className="flex invisible rounded-full w-100 h-100 text-white bg-[#333333] ">
              <CheckIcon className="w-6 h-6 text-bold" />
            </span>
          </label>
        </div>
      ))}
    </div>
  )
}

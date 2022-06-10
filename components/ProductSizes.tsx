export default ({ product }) => {
  return (
    <div className="flex gap-x-2">
      {product.sizes.map((size, index) => (
        <div key={index} className="product-size">
          <input
            type="radio"
            id={`productSize${index}`}
            name="product_size"
            className="hidden"
          />
          <label
            htmlFor={`productSize${index}`}
            className="py-1 px-2 uppercase border-2 border-primary rounded font-semibold text-primary cursor-pointer duration-200 hover:bg-primary hover:text-white"
          >
            {size}
          </label>
        </div>
      ))}
    </div>
  )
}

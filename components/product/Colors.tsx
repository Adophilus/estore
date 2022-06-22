import CheckIcon from '../icons/Check'
import { Product } from '../../types/Product'

type Props = {
  setColor: any //(color: string) => null
  product: Product
}

export default ({ setColor, product }: Props) => {
  return (
    <div className="flex gap-x-2">
      {product.colors.map((color, index) => (
        <div
          key={index}
          style={{
            backgroundColor: color
          }}
          className="product-color drop-shadow-md w-20"
        >
          <input
            type="radio"
            id={`productColor${index}`}
            name="product_color"
            className="hidden"
            defaultChecked={index === 0}
            value={color}
            onChange={(event) => setColor(event.target.value)}
          />
          <label
            htmlFor={`productColor${index}`}
            className={`w-full h-full py-2 flex justify-center items-center rounded cursor-pointer duration-200`}
          >
            <span className="flex invisible rounded-full w-100 h-100 text-white bg-primary ">
              <span className="w-6 h-6 text-bold">
                <CheckIcon />
              </span>
            </span>
          </label>
        </div>
      ))}
    </div>
  )
}

import { Heart, HeartSolid } from '../icons/Heart'
import { Product } from '../../types/Product'
import { Favourites } from '../../types/Favourites'

type Props = {
  product: Product
  favourites: Favourites
}

export default ({ product, favourites }: Props) => {
  let className =
    'rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center self-center ml-4 bg-primary text-white'

  return (
    <button
      onClick={() =>
        favourites.check(product)
          ? favourites.remove(product)
          : favourites.add(product)
      }
      className={className}
    >
      {favourites.check(product) ? (
        <span className={`w-6 h-6 ${className}`}>
          <Heart />
        </span>
      ) : (
        <span className={`w-6 h-6 ${className}`}>
          <HeartSolid />
        </span>
      )}
    </button>
  )
}

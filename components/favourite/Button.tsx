import { Heart, HeartSolid } from '../icons/Heart'

export default ({ product, favourites }) => {
  let className =
    'rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'

  if (favourites.check(product))
    className = `${className} bg-primary text-white`
  else className = `${className} bg-gray-200`

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
        <Heart className={`w-6 h-6 ${className}`} />
      ) : (
        <HeartSolid className={`w-6 h-6 ${className}`} />
      )}
    </button>
  )
}

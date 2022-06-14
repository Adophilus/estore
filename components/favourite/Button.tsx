import { Heart, HeartSolid } from '../icons/Heart'

export default ({ product, favourites }) => {
  let className =
    'rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center ml-4 bg-primary text-white'

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

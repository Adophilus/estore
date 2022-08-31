export default function ({ product, reviews }) {
  return (
    <div className="rating">
      {Array(Math.floor(product['@expand'].stats.rating.average))
        .fill(null)
        .map((_) => (
          <i className="fa fa-star"></i>
        ))}
      {Array(5 - Math.floor(product['@expand'].stats.rating.average))
        .fill(null)
        .map((_) => (
          <i className="fa fa-star-o"></i>
        ))}
      {reviews && (
        <span>
          &nbsp;-&nbsp;
          {Object.keys(product['@expand'].stats.rating.stars)
            .map((star) => product['@expand'].stats.rating.stars[star])
            .reduce((prev, next) => prev + next)}
          &nbsp; Reviews
        </span>
      )}
    </div>
  )
}

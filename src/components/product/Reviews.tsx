import AppContext from '../../contexts/App'
import RatingHover from './RatingHover.tsx'
import { useContext, useRef, useState } from 'preact/hooks'

export default function ({ product }) {
  const [error, setError] = useState(false)
  const { config } = useContext(AppContext)
  const rating = useRef(1)
  const review = useRef()
  const submitBtn = useRef()

  const onSubmitReview = async (e) => {
    e.preventDefault()
    submitBtn.current.disabled = true

    if (!review.current.value) {
      setError('Review cannot be empty!')
      submitBtn.current.disabled = false
      return
    }

    try {
      await fetch(`${config.backendUrl}/api/products/rating/${product.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          review: review.current.value,
          rating: rating.current
        })
      })
      submitBtn.current.disabled = false
    } catch (err) {
      setError(err)
      console.log(err)
      submitBtn.current.disabled = false
    }
  }

  return (
    <>
      <div className="product__details__tab__content">
        {product['@expand'].stats['@expand'].reviews
          .splice(0, 5)
          .map((review) => {
            const dateCreated = new Date(review.created)
            return (
              <div className="product__details__tab__content__item separate-y">
                <p>{review.review}</p>
                <div className="d-flex">
                  <div>
                    {Array(Math.floor(review.stars))
                      .fill(null)
                      .map((_) => (
                        <i className="fa fa-star"></i>
                      ))}
                    {Array(5 - Math.floor(review.stars))
                      .fill(null)
                      .map((_) => (
                        <i className="fa fa-star-o"></i>
                      ))}
                  </div>
                  <div className="d-flex ml-auto" style="column-gap: 3px">
                    <small className="align-self-center">
                      {review.creator}
                    </small>
                    |
                    <small className="align-self-center">
                      {dateCreated.getFullYear()}/{dateCreated.getMonth()}/
                      {dateCreated.getDate()}
                    </small>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
      <div className="product__details__tab__content">
        {error && (
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {error}
            <button
              type="button"
              class="close"
              onClick={() => setError(false)}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <form onSubmit={(e) => onSubmitReview(e)}>
          <div className="form__control">
            <textarea
              placeholder="Type in review..."
              rows="4"
              className="w-100"
              ref={review}
              style="border: 1px solid #3d3d3d; resize: none"
            ></textarea>
          </div>
          <div className="form__control d-flex justify-content-end">
            <RatingHover
              defaultRating={1}
              onChange={(rating) => (rating.current = rating)}
            />
            <button className="primary-btn ml-3" type="submit" ref={submitBtn}>
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

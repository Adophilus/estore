import AppContext from '../../contexts/App'
import RatingHover from './RatingHover.tsx'
import { useContext, useEffect, useRef, useState } from 'preact/hooks'

export default function ({ product }) {
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [reviews, setReviews] = useState([])
  const { pocketBaseClient, config } = useContext(AppContext)
  const rating = useRef(1)
  const review = useRef()
  const submitBtn = useRef()

  const getProductReviews = async () => {
    setReviews(
      await Promise.all(
        [...product['@expand'].stats.reviews]
          .splice(0, 5)
          .map((reviewId) =>
            pocketBaseClient.Records.getOne('product_reviews', reviewId)
          )
      )
    )
  }

  useEffect(() => getProductReviews(), [])

  const onSubmitReview = async (e) => {
    e.preventDefault()
    submitBtn.current.disabled = true

    if (!review.current.value) {
      setSuccess(false)
      setError('Review cannot be empty!')
      submitBtn.current.disabled = false
      return
    }

    try {
      const res = await fetch(
        `${config.backendUrl}/api/products/rating/${product.id}`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'PUT',
          body: JSON.stringify({
            creator: 'Dummy creator',
            stars: rating.current,
            review: review.current.value
          })
        }
      )
      //review.current.value = ''
      submitBtn.current.disabled = false
      setError(false)
      setSuccess((await res.json()).message)
    } catch (err) {
      setSuccess(false)
      setError('An error occurred while submitting your review!')
      console.log(err)
      submitBtn.current.disabled = false
    }
  }

  return (
    <>
      <div className="product__details__tab__content">
        {reviews.map((review) => {
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
                  <small className="align-self-center">{review.creator}</small>|
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
        <div>
          {(success && (
            <div
              class="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              {success}
              <button
                type="button"
                class="close"
                onClick={() => setSuccess(false)}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )) ||
            (error && (
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
            ))}
        </div>
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
              onChange={(_rating) => (rating.current = _rating)}
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

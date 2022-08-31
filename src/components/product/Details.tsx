import AppContext from '../../contexts/App'
import RatingHover from './RatingHover.tsx'
import { useContext, useRef, useState } from 'preact/hooks'

export default function ({ product }) {
  const { config } = useContext(AppContext)
  const rating = useRef(1)
  const review = useRef()
  const submitBtn = useRef()
  const [error, setError] = useState(false)

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
    <div className="product__details__tab">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            data-toggle="tab"
            href="#tabs-5"
            role="tab"
          >
            Description
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#tabs-6" role="tab">
            Customer Reviews (
            {Object.keys(product['@expand'].stats.rating.stars)
              .map((star) => product['@expand'].stats.rating.stars[star])
              .reduce((prev, next) => prev + next)}
            )
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#tabs-7" role="tab">
            Additional information
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane active" id="tabs-5" role="tabpanel">
          <div className="product__details__tab__content">
            <p className="note">
              Nam tempus turpis at metus scelerisque placerat nulla deumantos
              solicitud felis. Pellentesque diam dolor, elementum etos lobortis
              des mollis ut risus. Sedcus faucibus an sullamcorper mattis
              drostique des commodo pharetras loremos.
            </p>
            <div className="product__details__tab__content__item">
              <h5>Products Infomation</h5>
              <p>
                A Pocket PC is a handheld computer, which features many of the
                same capabilities as a modern PC. These handy little devices
                allow individuals to retrieve and store e-mail messages, create
                a contact file, coordinate appointments, surf the internet,
                exchange text messages and more. Every product that is labeled
                as a Pocket PC must be accompanied with specific software to
                operate the unit and must feature a touchscreen and touchpad.
              </p>
              <p>
                As is the case with any new technology product, the cost of a
                Pocket PC was substantial during it’s early release. For
                approximately $700.00, consumers could purchase one of
                top-of-the-line Pocket PCs in 2003. These days, customers are
                finding that prices have become much more reasonable now that
                the newness is wearing off. For approximately $350.00, a new
                Pocket PC can now be purchased.
              </p>
            </div>
            <div className="product__details__tab__content__item">
              <h5>Material used</h5>
              <p>
                Polyester is deemed lower quality due to its none natural
                quality’s. Made from synthetic materials, not natural like wool.
                Polyester suits become creased easily and are known for not
                being breathable. Polyester suits tend to have a shine to them
                compared to wool and cotton suits, this can make the suit look
                cheap. The texture of velvet is luxurious and breathable. Velvet
                is a great choice for dinner party jacket and can be worn all
                year round.
              </p>
            </div>
          </div>
        </div>
        <div className="tab-pane" id="tabs-6" role="tabpanel">
          <div className="product__details__tab__content">
            {product['@expand'].stats['@expand'].reviews
              .splice(0, 5)
              .map((review) => (
                <div className="product__details__tab__content__item separate-y">
                  <p>{review.review}</p>
                </div>
              ))}
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
                <button
                  className="primary-btn ml-3"
                  type="submit"
                  ref={submitBtn}
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="tab-pane" id="tabs-7" role="tabpanel">
          <div className="product__details__tab__content">
            <p className="note">
              Nam tempus turpis at metus scelerisque placerat nulla deumantos
              solicitud felis. Pellentesque diam dolor, elementum etos lobortis
              des mollis ut risus. Sedcus faucibus an sullamcorper mattis
              drostique des commodo pharetras loremos.
            </p>
            <div className="product__details__tab__content__item">
              <h5>Products Infomation</h5>
              <p>
                A Pocket PC is a handheld computer, which features many of the
                same capabilities as a modern PC. These handy little devices
                allow individuals to retrieve and store e-mail messages, create
                a contact file, coordinate appointments, surf the internet,
                exchange text messages and more. Every product that is labeled
                as a Pocket PC must be accompanied with specific software to
                operate the unit and must feature a touchscreen and touchpad.
              </p>
              <p>
                As is the case with any new technology product, the cost of a
                Pocket PC was substantial during it’s early release. For
                approximately $700.00, consumers could purchase one of
                top-of-the-line Pocket PCs in 2003. These days, customers are
                finding that prices have become much more reasonable now that
                the newness is wearing off. For approximately $350.00, a new
                Pocket PC can now be purchased.
              </p>
            </div>
            <div className="product__details__tab__content__item">
              <h5>Material used</h5>
              <p>
                Polyester is deemed lower quality due to its none natural
                quality’s. Made from synthetic materials, not natural like wool.
                Polyester suits become creased easily and are known for not
                being breathable. Polyester suits tend to have a shine to them
                compared to wool and cotton suits, this can make the suit look
                cheap. The texture of velvet is luxurious and breathable. Velvet
                is a great choice for dinner party jacket and can be worn all
                year round.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useRef } from 'preact/hooks'

export default function () {
  const product = useRef()
  return (
    <div className="search-model">
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div
          onClick={() => {
            $('.search-model').fadeOut(400, function () {
              $('#search-input').val('')
            })
          }}
          className="search-close-switch"
        >
          +
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            window.location.href = `/shop?name=${window.encodeURIComponent(
              product.current.value
            )}`
          }}
          className="search-model-form"
        >
          <input
            type="text"
            ref={product}
            id="search-input"
            placeholder="Search here....."
          />
        </form>
      </div>
    </div>
  )
}

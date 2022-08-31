import { useEffect, useState } from 'preact/hooks'

export default function ({ onChange, defaultRating }) {
  const [rating, setRating] = useState(defaultRating)
  const [hover, setHover] = useState(0)

  return Array(5)
    .fill()
    .map((star, index) => {
      index++
      return (
        <button
          style="background-color: transparent; border: 0"
          type="button"
          key={index}
          onClick={() => {
            setRating(index)
            onChange(index)
          }}
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(rating)}
        >
          <i
            class={`fa ${index <= (hover || rating) ? 'fa-star' : 'fa-star-o'}`}
            aria-hidden="true"
          ></i>
        </button>
      )
    })
}

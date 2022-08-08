import '../assets/dropdown.css'

export default function ({ items, placeholder }) {
  return (
    <span className="dropdown">
      <button>{placeholder}</button>
      <label>
        <input type="checkbox" />
        <ul>
          {items.map((item) => (
            <li onClick={(e) => item.onClick && item.onClick(e)}>
              {item.icon} {item.text}
            </li>
          ))}
        </ul>
      </label>
    </span>
  )
}

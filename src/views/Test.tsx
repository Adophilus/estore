import { useEffect, useRef } from 'preact/hooks'

export default function () {
  const selectRef = useRef()

  useEffect(() => {
    window.jQuery(selectRef.current).niceSelect()
  }, [])

  return (
    <select ref={selectRef}>
      <option>Hello</option>
      <option>Hi</option>
    </select>
  )
}

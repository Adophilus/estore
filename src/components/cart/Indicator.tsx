export default function ({ cart }) {
  return (
    <>
      <img src="/img/icon/cart.png" alt="" />
      <span>{cart.items.length}</span>
    </>
  )
}

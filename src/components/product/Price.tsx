export default function ({ product }) {
  return <>${product.price.toFixed(2)}</>
  // TODO: feature-sale
  // return (
  //   <>
  //     ${product.price.toFixed(2)} <span>70.00</span>
  //   </>
  // )
}

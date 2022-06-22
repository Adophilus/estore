type Product = {
  slug: string
  name: string
  description: string
  images: Array<string>
  colors: Array<string>
  sizes: Array<string>
  price: number
}

type ProductDetails = {
  product: Product
  color: string
  size: string
}

type ProductVariant = {
  color: string
  size: string
  qty: number
}

export { Product, ProductDetails, ProductVariant }

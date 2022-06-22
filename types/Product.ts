export type Product = {
  slug: string
  name: string
  description: string
  images: Array<string>
  colors: Array<string>
  sizes: Array<string>
  price: number
}

export type ProductDetails = {
  product: Product
  color: string
  size: string
}

export type ProductVariant = {
  color: string
  size: string
  qty: number
}

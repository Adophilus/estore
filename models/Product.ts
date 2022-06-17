import mongoose from 'mongoose'

const Product = new mongoose.Schema({
  slug: {
    type: String,
    required: true
  },
  name: {
    type: String,
    lowercase: true,
    index: true,
    unique: true,
    required: true
  },
  sizes: {
    type: [String],
    required: true
  },
  colors: {
    type: [String],
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

let model
if (mongoose.models['Product']) model = mongoose.model('Product')
else model = mongoose.model('Product', Product)

export default model

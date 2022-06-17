import mongoose from 'mongoose'

const Cart = new mongoose.Schema({
  items: {
    type: Object,
    default: {}
  }
})

let model
if (mongoose.models['Cart']) model = mongoose.model('Cart')
else model = mongoose.model('Cart', Cart)

export default model

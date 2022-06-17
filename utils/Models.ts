import mongoose from 'mongoose'
import config from '../config/config'
import Product from '../models/Product'

mongoose.connect(config.mongoDB.connectionURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

export { Product }

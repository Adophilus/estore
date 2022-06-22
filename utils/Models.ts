import mongoose from 'mongoose'
import config from '../config/config'
import Cart from '../models/Cart'
import Product from '../models/Product'

mongoose.connect(config.mongoDB.connectionURI)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

export { Cart, Product }

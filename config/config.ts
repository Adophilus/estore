import dotenv from 'dotenv'

dotenv.config()

const config = {
  app: {
    baseUrl: process.env.BASE_URL
  },
  mongoDB: {
    connectionURI: process.env.MONGODB_URI
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY
  }
}

export default config

import dotenv from 'dotenv'

dotenv.config()

const config = {
  mongoDB: {
    connectionURI: process.env.MONGODB_URI
  }
}

export default config

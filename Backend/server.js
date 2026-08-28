import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import imageVerificationRouter from './routes/imageVerification.js'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.json({
  limit: '10mb'
}))

app.use('/api/image', imageVerificationRouter)

app.get('/', (req, res) => {
  res.json({
    message: 'eDonationHub API is running'
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
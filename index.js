import express from 'express'
import cors from 'cors'
import product_router from './src/routers/products.js'

const app = express()

app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))

app.use('/api/v2', product_router)

app.listen(3001, () => console.log('Server running at http://localhost:3001'))

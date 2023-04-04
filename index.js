import express from 'express'
import cors from 'cors'
import users_router from './src/routers/users.js'
import product_router from './src/routers/products.js'

const app = express()

app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))

app.use('/api/v2', users_router)
app.use('/api/v2', product_router)

// route image
app.use(`/api/v2/image/`, express.static('./public/images'))
app.listen(3001, () => console.log('Server running at http://localhost:3001'))

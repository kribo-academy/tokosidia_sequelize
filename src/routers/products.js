import express from 'express'
import { createProduct } from '../controllers/products.js'
import uploadImage from '../middleware/upload_img.js'

const Router = express.Router()

Router.post('/product', uploadImage, createProduct)

export default Router

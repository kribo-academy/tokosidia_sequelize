import express from 'express'
import { register, detail, updated } from '../controllers/users.js'
import uploadImage from '../middleware/upload_img.js'

const Router = express.Router()

Router.post('/user/register', uploadImage, register)
Router.get('/user/:id', detail)
Router.put('/user/:id', uploadImage, updated)

export default Router

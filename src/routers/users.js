import express from 'express'
import {
  register,
  detail,
  all,
  updated,
  deleted,
} from '../controllers/users.js'
import uploadImage from '../middleware/upload_img.js'

const Router = express.Router()

Router.post('/user/register', uploadImage, register)
Router.get('/user/:id', detail)
Router.get('/users', all)
Router.put('/user/:id', uploadImage, updated)
Router.delete('/user/:id', deleted)

export default Router

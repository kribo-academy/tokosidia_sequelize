import multer from 'multer'
import path from 'path'
import messages from '../utils/messages.js'

const max_size_file = 1 // 1MB

// set destination storage and filename
const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/images/')
  },
  filename: (req, file, callback) => {
    let file_name = `product_${Date.now()}${path.extname(file.originalname)}`
    callback(null, file_name)
  },
})

// set connection multer with storage
const uploading = multer({
  storage: multerStorage,
  limits: { fileSize: max_size_file * 1024 * 1024 },
  // validation extention file
  fileFilter: (req, file, callback) => {
    const type = path.extname(file.originalname).toLowerCase()
    if (['.png', '.jpg', '.jpeg'].includes(type)) callback(null, true)
    else
      callback(
        { error: 'Extention image must be jpg/jpeg/png', code: 'wrongtype' },
        false,
      )
  },
})

// middleware
const uploadImage = (req, res, next) => {
  const upload = uploading.single('image') // name
  if (upload) {
    upload(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          messages(res, 413, `Maximum file ${max_size_file}Mb`)
        } else if (err.code === 'wrongtype') {
          messages(res, 400, err)
        } else {
          messages(res, 500, 'Something wrong when upload image')
        }
      } else {
        next()
      }
    })
  } else {
    next()
  }
}

export default uploadImage

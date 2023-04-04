import Product from '../models/products.js'
import messages from '../utils/messages.js'

const createProduct = async (req, res) => {
  const body = req.body
  const file = req.file

  const data = { ...body }

  if (file) {
    data.image_url = file.filename

    try {
      await Product.sync()

      const result = await Product.create(data)

      messages(res, 201, 'Create product success', result)
    } catch (error) {
      messages(res, 500, 'Internal server error')
    }
  } else {
    messages(res, 400, 'Field required')
  }
}

export { createProduct }

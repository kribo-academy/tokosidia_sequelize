import Users from '../models/users.js'
import messages from '../utils/messages.js'
import fs from 'fs'

const register = async (req, res) => {
  const body = req.body
  const file = req.file

  const data = { ...body }

  if (!body.email || !body.password) {
    const path = `./public/images/${file.filename}`
    fs.unlinkSync(path) // delete file
    return messages(res, 400, 'Field Email or Password is required')
  }

  if (file) {
    data.image = file.filename

    try {
      await Users.sync()

      const checkEmail = await Users.findOne({ where: { email: data.email } })

      if (checkEmail) {
        const path = `./public/images/${file.filename}`
        fs.unlinkSync(path) // delete file
        return messages(res, 400, 'Email has been register')
      } else {
        const result = await Users.create(data)
        messages(res, 201, 'Create product success', result)
      }
    } catch (error) {
      messages(res, 500, 'Internal server error')
    }
  } else {
    messages(res, 400, 'Field image required')
  }
}

const detail = async (req, res) => {
  const id = req.params.id
  try {
    await Users.sync()
    const checkUser = await Users.findOne({ where: { id } })

    if (checkUser) {
      const { id, email, image, createdAt, updatedAt } = checkUser
      const detail = { id, email, image, createdAt, updatedAt }

      return messages(res, 200, 'Detail User', detail)
    } else return messages(res, 400, `User not found`)
  } catch (error) {
    messages(res, 500, 'Internal server error')
  }
}

const updated = async (req, res) => {
  const id = req.params.id
  const data = req.body
  const file = req.file

  try {
    await Users.sync()
    const checkUser = await Users.findOne({ where: { id } })

    if (checkUser) {
      if (file) {
        data.image = file.filename
        const path = `./public/images/${checkUser.image}`
        // check file existting image
        if (fs.existsSync(path)) fs.unlinkSync(path) // delete old file

        await Users.update(data, { where: { id } })
        messages(res, 201, 'Update user success')
      } else {
        delete data.image

        await Users.update(data, { where: { id } })
        messages(res, 201, 'Update user success')
      }
    } else {
      const path = `./public/images/${file.filename}`
      fs.unlinkSync(path) // delete file
      return messages(res, 400, `User not found`)
    }
  } catch (error) {
    messages(res, 500, 'Internal server error')
  }
}

const deleted = async (req, res) => {
  const id = req.params.id

  try {
    await Users.sync()
    const checkUser = await Users.findOne({ where: { id } })

    if (checkUser) {
      const path = `./public/images/${checkUser.image}`

      // check file existting image
      if (fs.existsSync(path)) fs.unlinkSync(path) // delete file

      await Users.destroy({ where: { id } })
      messages(res, 200, 'Delete user success')
    } else return messages(res, 400, `User not found`)
  } catch (error) {
    messages(res, 500, 'Internal server error')
  }
}

export { register, detail, updated, deleted }

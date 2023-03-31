const messages = (res, code, message, data, pagintaion) => {
  let result = { code, message, data, pagintaion }

  res.status(code).send(result)
}

export default messages

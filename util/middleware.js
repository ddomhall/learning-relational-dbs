const { SECRET } = require('./config')
const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  console.log(error)
  const errors = ['SequelizeValidationError', 'SequelizeDatabaseError', 'TypeError', 'SequelizeUniqueConstraintError']
  if (errors.includes(error.name)) {
    return response.status(400).send({ error: 'invalid request' })
  } 

  next(error)
}

module.exports = {
  tokenExtractor, errorHandler
}

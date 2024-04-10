const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const notesRouter = require('./controllers/blogs')

app.use(express.json())

app.use('/api/blogs', notesRouter)

const errorHandler = (error, request, response, next) => {
  const errors = ['SequelizeValidationError', 'SequelizeDatabaseError', 'TypeError']
  if (errors.includes(error.name)) {
    return response.status(400).send({ error: 'invalid request' })
  } 

  next(error)
}

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

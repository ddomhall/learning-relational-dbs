const router = require('express').Router()
const { Blog, User } = require('../models')
const {tokenExtractor} = require('../util/middleware')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
  const where = {}
  if (req.query.search) {
    where.title = {
      [Op.iLike]: `%${req.query.search}%`
    }
  }
  const blogs = await Blog.findAll({
    attributes: {
      exclude: ['userId']
    },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
    res.json(blog)
  } catch(error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)
  blog.likes = req.body.likes
  await blog.save().catch(e => next(e))
  res.json(blog)
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.findByPk(req.params.id)
    if (blog.userId === user.id) {
      await blog.destroy()
      res.status(201).send('blog deleted')
    } else {
      res.status(401).send('not authorized')
    }
  } catch(error) {
    next(error)
  }
})

module.exports = router

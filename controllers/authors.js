const router = require('express').Router()
const { Blog } = require('../models')
const { Op, fn, col } = require('sequelize')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: ['author', [fn('COUNT', col('title')), 'blogs'], [fn('COUNT', col('likes')), 'likes']],
    group: 'author'
  })
  res.json(blogs)
})

module.exports = router

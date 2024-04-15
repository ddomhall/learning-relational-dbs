const router = require('express').Router()
const { ReadingLists } = require('../models')
const {tokenExtractor} = require('../util/middleware')

router.post('/', tokenExtractor, async (req, res) => {
  const addition = await ReadingLists.create({"userId": req.decodedToken.id, "blogId": req.body.blogId})
  res.json(addition)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  if (!req.body.read) {
    res.status(400).json({error: 'needs read status'})
  }

  const item = await ReadingLists.findByPk(req.params.id)
  if (item.userId !== req.decodedToken.id) {
    res.status(401).json({error: 'not your list'})
  }

  item.read = req.body.read
  await item.save()
  res.json(item)
})

module.exports = router

const router = require('express').Router()
const { ReadingLists } = require('../models')
const {tokenExtractor} = require('../util/middleware')

router.post('/', tokenExtractor, async (req, res) => {
  const addition = await ReadingLists.create({"userId": req.decodedToken.id, "blogId": req.body.blogId})
  res.json(addition)
})

module.exports = router

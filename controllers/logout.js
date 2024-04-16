const router = require('express').Router()

const {Sessions} = require('../models/index')
const {tokenExtractor} = require('../util/middleware')

router.post('/', tokenExtractor, async (req, res) => {
  const session = await Sessions.findOne({
    where: {
      user_id: req.decodedToken.id
    }
  })
  await session.destroy()
  res.status(204).json({msg: 'logged out'})
})

module.exports = router


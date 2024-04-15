const router = require('express').Router()
const { User, Blog } = require('../models')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {exclude: ['userId']}
    }
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body).catch(e => next(e))
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  let read = {
    [Op.in]: [true, false]
  }
  if (req.query.read) {
    read = req.query.read === "true"
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } ,
    include:[{
        model: Blog,
        attributes: { exclude: ['userId'] }
      },
      {
        model: Blog,
        as: 'saved_blogs',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt']},
        through: {
          attributes: ['id', 'read'],
          where: {
            read
          },
        },
      },
    ]
  })
  res.json(user)
})

router.put('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router

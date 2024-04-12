const Blog = require('./blog')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

async function init() {
  await User.sync({alter: true})
  await Blog.sync({alter: true})
}

init()

module.exports = {
  Blog, User
}

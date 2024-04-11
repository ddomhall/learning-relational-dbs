const Blog = require('./blog')
const User = require('./user')

Blog.sync()
User.sync()

User.hasMany(Blog)
Blog.belongsTo(User)

module.exports = {
  Blog, User
}

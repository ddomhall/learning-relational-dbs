const Blog = require('./blog')
const User = require('./user')
const ReadingLists = require('./reading_lists')
const Sessions = require('./sessions')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'saved_blogs' })
Blog.belongsToMany(User, { through: ReadingLists, as: 'users_saved' })

module.exports = {
  Blog, User, ReadingLists, Sessions
}

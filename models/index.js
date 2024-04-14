const Blog = require('./blog')
const User = require('./user')
const UserNotes = require('./reading_list')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: UserNotes, as: 'marked_blogs' })
Blog.belongsToMany(User, { through: UserNotes, as: 'users_marked' })

module.exports = {
  Blog, User
}

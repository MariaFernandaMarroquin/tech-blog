const User = require("./User");
const BlogPost = require("./BlogPost");

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  Project.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  module.exports = { User, Project };
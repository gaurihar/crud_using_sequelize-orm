const Sequelize = require("sequelize");
const post = require("../../sequelize-mysql/models/post");

const sequelize = require("../utils/database");

const Post = sequelize.define("post", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  
});

module.exports = Post;
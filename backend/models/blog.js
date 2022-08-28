'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {foreignKey: 'category_id', as: 'categories'})
      this.belongsTo(models.User, {foreignKey: 'author_id', as: 'authors'})
      this.hasMany(models.Comment , {foreignKey: 'blog' , as: 'comments'})
    }
  }
  Blog.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    img: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};
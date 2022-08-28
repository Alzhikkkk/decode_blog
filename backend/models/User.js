'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Blog , {foreignKey: 'author_id' , as: 'blogs'})
      this.hasMany(models.Comment , {foreignKey: 'user' , as: 'comments'})
    }
  }
  User.init({
    email: DataTypes.STRING,
    full_name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
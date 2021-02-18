'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.owner.hasMany(models.property)
    }
  };
  owner.init({
    name: DataTypes.TEXT,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'owner',
  });
  return owner;
};
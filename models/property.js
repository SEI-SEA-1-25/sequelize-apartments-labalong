'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.property.belongsTo(models.owner)
    }
  };
  property.init({
    ownerId: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    units: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'property',
  });
  return property;
};
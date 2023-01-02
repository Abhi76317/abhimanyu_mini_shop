'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.Order_Attribute, {
        foreignKey: 'order_id',
        as: 'order_attribute'
      })
    }
  }
  Order.init({
    user_id: DataTypes.STRING,
    price: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
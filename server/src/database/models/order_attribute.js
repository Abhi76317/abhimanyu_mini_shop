'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order_Attribute.init({
    order_id: DataTypes.STRING,
    product_id: DataTypes.STRING,
    Product_Size_id: DataTypes.STRING,
    Product_Color_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order_Attribute',
  });
  return Order_Attribute;
};
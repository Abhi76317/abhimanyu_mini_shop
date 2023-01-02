'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order_Attributes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      order_id: {
        type: Sequelize.STRING,
        references:{
          model: 'Orders',
          key: 'id'
        }
      },
      product_id: {
        type: Sequelize.STRING,
        references:{
          model: 'Products',
          key: 'id'
        }
      },
      Product_Size_id: {
        type: Sequelize.STRING,
        references:{
          model: 'Product_Sizes',
          key: 'id'
        }
      },
      Product_Color_id: {
        type: Sequelize.STRING,
        references:{
          model: 'Product_Colors',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Order_Attributes');
  }
};
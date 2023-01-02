'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Product_Sizes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      product_id: {
        type: Sequelize.STRING,
        references:{
          model: 'Products',
          key: 'id'
        }
      },
      size: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('Product_Sizes');
  }
};
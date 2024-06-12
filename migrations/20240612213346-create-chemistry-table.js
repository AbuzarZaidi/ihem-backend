'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the chemistry table
    await queryInterface.createTable('chemistry', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      lastname: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      color_data: {
        type: 'color_type', // Using the color_type composite type
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    // Drop the chemistry table
    await queryInterface.dropTable('chemistry');
  }
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the pmmldata table
    await queryInterface.createTable('pmmldata', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      devicetype: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
        unique: true
      },
      pmml: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ''
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
    // Drop the pmmldata table
    await queryInterface.dropTable('pmmldata');
  }
};

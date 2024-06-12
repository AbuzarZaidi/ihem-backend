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
      creationdate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    // Drop the pmmldata table
    await queryInterface.dropTable('pmmldata');
  }
};

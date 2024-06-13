'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the treatment table
    await queryInterface.createTable('treatments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      sample: {
        type: 'hair_sample', // Using the hair_sample composite type
        allowNull: false
      },
      uuid_user: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      comments: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      creationdate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()')
      },
      currcolor: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '0.0'
      },
      wishedcolor: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '0.0'
      },
      gotcolor: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '0.0'
      },
      quantity: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 50.0
      },
      recipe: {
        type: 'color_type',
        allowNull: false
      },
      recipehem: {
        type: 'color_type',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    // Drop the treatment table
    await queryInterface.dropTable('treatment');
  }
};

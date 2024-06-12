'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the composite type
    await queryInterface.sequelize.query(`
      CREATE TYPE hair_sample AS (
        hair_type INTEGER,
        thickness INTEGER,
        position INTEGER,
        growth INTEGER,
        length INTEGER,
        white_hair INTEGER,
        density INTEGER
      );
    `);
  },
  async down(queryInterface, Sequelize) {
    // Drop the composite type
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS hair_sample;');
  }
};

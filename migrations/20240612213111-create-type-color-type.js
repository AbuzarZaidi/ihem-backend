'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the composite type
    await queryInterface.sequelize.query(`
      CREATE TYPE color_type AS (
        color_033 DOUBLE PRECISION,
        color_11 DOUBLE PRECISION,
        color_42 DOUBLE PRECISION,
        color_50 DOUBLE PRECISION,
        color_566 DOUBLE PRECISION,
        color_100 DOUBLE PRECISION,
        oxytype DOUBLE PRECISION,
        oxygen DOUBLE PRECISION,
        exposure DOUBLE PRECISION
      );
    `);
  },
  async down(queryInterface, Sequelize) {
    // Drop the composite type
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS color_type;');
  }
};

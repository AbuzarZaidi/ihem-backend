const { Sequelize } = require('sequelize');
const PMMLDataModel = require('../models/pmmldata');
const ChemistryModel = require('../models/chemistry');
const TreatmentModel = require('../models/treatment');
// Create a new instance of Sequelize
// const sequelize = new Sequelize('ihem', 'postgres', '12345678', {
const sequelize = new Sequelize('dblabor', 'postgres', 'labor', {
// const sequelize = new Sequelize('dblabor', 'postgres', 'labor', {
  // host: '192.168.0.107',
  host: '192.168.10.15',
  // host: '192.168.10.28',
  dialect: 'postgres', // Specify the dialect
});
sequelize.authenticate()
  .then(() => {
    console.log('Connection established.');
  })
  .catch((error) => {
    console.log('Error: ' + error);
  });
  const PMMLData = PMMLDataModel(sequelize, Sequelize);
  const Chemistry = ChemistryModel(sequelize, Sequelize);
  const Treatment = TreatmentModel(sequelize, Sequelize);
  module.exports = {
    sequelize,
    PMMLData,
    Chemistry,
    Treatment
  }
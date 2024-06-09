const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize
const sequelize = new Sequelize('ihem', 'postgres', '12345678', {
  host: 'localhost',
  dialect: 'postgres', // Specify the dialect
});
sequelize.authenticate()
  .then(() => {
    console.log('Connection established.');
  })
  .catch((error) => {
    console.log('Error: ' + error);
  });

  module.exports = {
    sequelize
  }
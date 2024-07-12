const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const PMMLData = sequelize.define('pmmldata', {
    // id: {
    //   type: DataTypes.BIGINT,
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    devicetype: DataTypes.TEXT,
    pmml: DataTypes.TEXT
  });

  return PMMLData;
};
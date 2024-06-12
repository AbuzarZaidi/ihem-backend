const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const User_Role = sequelize.define('pmmldata', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    devicetype: DataTypes.TEXT,
    pmml: DataTypes.TEXT
  });

  return User_Role;
};
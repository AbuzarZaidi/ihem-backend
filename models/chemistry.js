const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Chemistry = sequelize.define('chemistry', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    color_data: {
      type: 'color_type',
      allowNull: true
    }
  });

  return Chemistry;
};
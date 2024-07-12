const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Chemistry = sequelize.define('chemistry', {
    table_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    color_033: DataTypes.DOUBLE,
    color_11: DataTypes.DOUBLE,
    color_42: DataTypes.DOUBLE,
    color_50: DataTypes.DOUBLE,
    color_566: DataTypes.DOUBLE,
    color_100: DataTypes.DOUBLE,
    // oxytype: DataTypes.DOUBLE,
    // oxygen: DataTypes.DOUBLE,
    // exposure: DataTypes.DOUBLE
    // color_data: {
    //   type: 'color_type',
    //   allowNull: true
    // }
  }, {
    tableName: 'chemistry'  // Explicitly define the table name
  });

  return Chemistry;
};
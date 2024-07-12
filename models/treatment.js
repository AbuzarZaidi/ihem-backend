const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Treatment = sequelize.define('treatment', {
    table_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    sample: {
      type: 'hair_sample',
      allowNull: true
    },
    uuid_user: DataTypes.TEXT,
    comments: DataTypes.TEXT,
    currcolor: DataTypes.TEXT,
    wishedcolor: DataTypes.TEXT,
    gotcolor: DataTypes.TEXT,
    quantity: DataTypes.DOUBLE,
    recipe: {
      type: 'color_type',
      allowNull: true
    },
    recipehem: {
      type: 'color_type',
      allowNull: true
    }
  }, {
    tableName: 'treatment',  // Explicitly define the table name
    timestamps: false, 
  });

  return Treatment;
};
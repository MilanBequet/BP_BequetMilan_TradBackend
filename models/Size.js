const { DataTypes } = require('sequelize');
const Product = require('./Product');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Size', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'sizes',
    timestamps: false,
    freezeTableName: true,
  });
};


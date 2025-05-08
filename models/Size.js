const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('./Product');

const Size = sequelize.define('Size', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
{
  timestamps: false
});

// Size.belongsToMany(Product, {
//   through: 'product_sizes',
//   foreignKey: 'size_id',
//   otherKey: 'product_id',
// });


module.exports = Size;

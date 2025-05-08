const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Size = require('./Size');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
},
{
  timestamps: false  
});

// Product.belongsToMany(Size, { through: 'product_sizes',foreignKey: 'product_id',
//   otherKey: 'size_id', timestamps: false, });
// Size.belongsToMany(Product, { through: 'product_sizes', timestamps: false, });

module.exports = Product;

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const OrderProducts = sequelize.define('OrderProducts', {
  OrderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Orders',
        key: 'id',
      },
  },
  ProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Products',
        key: 'id',
      },
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  timestamps: false,
});

module.exports = OrderProducts;

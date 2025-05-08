const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('./Product');
const User = require('./User');

class Order extends Model {}

Order.init({
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
}, {
  sequelize,
  modelName: 'Order',
});

Order.belongsToMany(Product, { through: 'OrderProducts' });

module.exports = Order;

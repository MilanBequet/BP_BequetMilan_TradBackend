const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, ProductModel) => {
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
    tableName: 'orders',
  });

  if (ProductModel) {
    Order.belongsToMany(ProductModel, { through: 'OrderProducts' });
  }

  return Order;
};

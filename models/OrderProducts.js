const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('OrderProducts', {
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id',
      },
      primaryKey: true,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  }, {
    tableName: 'orderproducts',
    timestamps: false,
    freezeTableName: true,
  });
};

const Product = require('./Product');
const Size = require('./Size');
const Order = require('./Orders');
const OrderProducts = require('./OrderProducts');

Product.belongsToMany(Size, {
  through: 'product_sizes',
  foreignKey: 'product_id',
  otherKey: 'size_id',
  timestamps: false,
});

Size.belongsToMany(Product, {
  through: 'product_sizes',
  foreignKey: 'size_id',
  otherKey: 'product_id',
  timestamps: false,
});

Order.belongsToMany(Product, { 
  through: OrderProducts, 
  foreignKey: 'OrderId',
  otherKey: 'ProductId',
  timestamps: false
});

Product.belongsToMany(Order, { 
  through: OrderProducts, 
  foreignKey: 'ProductId',
  otherKey: 'OrderId',
  timestamps: false
});

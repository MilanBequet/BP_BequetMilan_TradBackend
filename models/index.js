const initializeSequelize = require('../db');
const initUser = require('./User');
const initProduct = require('./Product');
const initSize = require('./Size');
const initOrder = require('./Orders');
const initOrderProducts = require('./OrderProducts');
const setupAssociations = require('./associations');

async function initializeModels() {
  const sequelize = await initializeSequelize();

  const models = {};

  models.User = initUser(sequelize, require('sequelize').DataTypes);
  models.Product = initProduct(sequelize, require('sequelize').DataTypes);
  models.Size = initSize(sequelize, require('sequelize').DataTypes);
  models.OrderProducts = initOrderProducts(sequelize, require('sequelize').DataTypes);
  models.Order = initOrder(sequelize, models.Product);

  setupAssociations(models);

  models.sequelize = sequelize;

  return models;
}

module.exports = initializeModels;

const AWSXRay = require('aws-xray-sdk');
const mysql = AWSXRay.captureMySQL(require('mysql2'));
const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectModule: AWSXRay.captureMySQL(require('mysql2')),
  logging: false,
});

module.exports = sequelize;

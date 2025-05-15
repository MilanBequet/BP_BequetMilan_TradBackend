const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

async function initializeSequelize() {
  if (sequelize) return sequelize;

  const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME
  } = process.env;

  sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  });

  try {
    await sequelize.authenticate();
    console.log("Verbinding met de database is geslaagd!");
  } catch (err) {
    console.error("Kan geen verbinding maken met de database:", err);
    throw err;
  }

  return sequelize;
}

module.exports = initializeSequelize;

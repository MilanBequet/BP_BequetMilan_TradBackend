const initializeModels = require('../models/index.js');

const getAllProducts = async () => {
  try {
    const { Product } = await initializeModels();
    const products = await Product.findAll();
    return products;
  } catch (err) {
    throw new Error('Fout bij het ophalen van de producten: ' + err.message);
  }
};

const getProductById = async (id) => {
  try {
    const { Product } = await initializeModels();
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error('Product niet gevonden');
    }
    return product;
  } catch (err) {
    throw new Error('Fout bij het ophalen van het product: ' + err.message);
  }
};


module.exports = { getAllProducts, getProductById };

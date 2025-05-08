const  Product  = require('../models/Product.js');
const  Size  = require('../models/Size.js');

const getAllProducts = async () => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Size,
        through: { attributes: [] }
      }]
    });
    return products;
  } catch (err) {
    throw new Error('Fout bij het ophalen van de producten: ' + err.message);
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findByPk(id, {
      include: [{
        model: Size,
        attributes: ['name'],
      }],
    });

    if (!product) {
      throw new Error('Product niet gevonden');
    }
    return product;
  } catch (err) {
    throw new Error('Fout bij het ophalen van het product: ' + err.message);
  }
};

module.exports = { getAllProducts, getProductById };

const initializeModels = require('../models/index.js');

async function main() {
  const models = await initializeModels();

  const products = await getAllProducts(models);
  console.log(products);
}

const getAllProducts = async (models) => {
  try {
    const products = await models.Product.findAll({
      include: [{
        model: models.Size,
        through: { attributes: [] }
      }]
    });
    return products;
  } catch (err) {
    throw new Error('Fout bij het ophalen van de producten: ' + err.message);
  }
};

const getProductById = async (models, id) => {
  try {
    const product = await models.Product.findByPk(id, {
      include: [{
        model: models.Size,
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

main().catch(console.error);

module.exports = { getAllProducts, getProductById };

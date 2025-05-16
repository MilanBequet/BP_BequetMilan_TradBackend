const initializeModels = require('../models/index.js');

const createOrder = async ( { firstname, name, email, address, phone, cart }) => {
  if (!firstname || !name || !email || !address || !phone || !cart || cart.length === 0) {
    throw new Error('Vul alle velden in en voeg producten toe aan je bestelling.');
  }

  try {
    const { Order, OrderProducts } = await require('../models')();

    const order = await Order.create({
      firstname,
      name,
      email,
      address,
      phone,
      status: 'pending',
    });

    const orderProducts = cart.map(item => ({
      OrderId: order.id,
      ProductId: item.id,
      quantity: item.quantity || 1,
    }));

    await OrderProducts.bulkCreate(orderProducts);

    return order;
  } catch (err) {
    throw new Error('Fout bij het verwerken van de bestelling: ' + err.message);
  }
};



module.exports = { createOrder };

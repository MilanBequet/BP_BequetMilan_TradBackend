const AWSXRay = require('aws-xray-sdk');
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
require('./models/associations');
const { getAllProducts, getProductById } = require('./services/productService');
const { createOrder } = require('./services/orderService');
const dotenv = require('dotenv');

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

AWSXRay.captureHTTPsGlobal(require('http'));

app.use(AWSXRay.express.openSegment('bachelorproef-backend'));

app.use(cors());
app.use(express.json());

AWSXRay.captureAsyncFunc('sequelize-sync', function (segment) {
  sequelize.sync().then(() => {
    console.log('Database gesynchroniseerd!');
  }).catch((err) => {
    console.error('Fout bij synchroniseren van de database:', err);
  });
});

app.get('/', (req, res) => {
  res.send('Welkom!');
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    console.error('Fout bij het ophalen van producten:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await getProductById(id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.post('/api/order', async (req, res) => {
  const { firstname, name, email, address, phone, cart } = req.body;

  try {
    const order = await createOrder({ firstname, name, email, address, phone, cart });
    return res.status(201).json({ message: 'Bestelling succesvol ontvangen!', order });
  } catch (err) {
    console.error('Error bij het verwerken van de bestelling:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.use(AWSXRay.express.closeSegment());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
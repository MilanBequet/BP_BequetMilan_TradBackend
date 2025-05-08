const mysql = require('mysql2/promise');
const { faker } = require('@faker-js/faker');

function generateProduct() {
  const categories = ['T-shirt', 'Broek', 'Trui', 'Jas', 'Jurk', 'Rok', 'Short', 'Hoodie'];
  const colors = ['Zwart', 'Wit', 'Blauw', 'Rood', 'Groen', 'Geel', 'Grijs'];

  const category = faker.helpers.arrayElement(categories);
  const color = faker.helpers.arrayElement(colors);
  const price = faker.commerce.price({ min: 10, max: 200, dec: 2 });
  const name = `${category} ${faker.color.human()} ${faker.commerce.productAdjective()}`;
  const adjectives = ['stijlvolle', 'comfortabele', 'trendy', 'klassieke', 'lichte', 'zachte'];
  const description = `Deze ${faker.helpers.arrayElement(adjectives)} ${category.toLowerCase()} is perfect voor elke gelegenheid.`;
  const imageUrl = faker.image.urlLoremFlickr({ category: 'fashion' });

  return { name, description, price, category, color, imageUrl };
}

async function seedProducts() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

  for (let i = 0; i < 100; i++) {
    const product = generateProduct();
    
    const [result] = await connection.execute(
      'INSERT INTO products (name, description, price, category, color, imageUrl) VALUES (?, ?, ?, ?, ?, ?)',
      [product.name, product.description, product.price, product.category, product.color, product.imageUrl]
    );

    const productId = result.insertId;

    const [sizeRows] = await connection.execute('SELECT id FROM sizes');
    for (const size of sizeRows) {
      await connection.execute(
        'INSERT INTO product_sizes (product_id, size_id) VALUES (?, ?)',
        [productId, size.id]
      );
    }
  }

  console.log('100 producten toegevoegd, elk met 5 maten!');
  await connection.end();
}

seedProducts();

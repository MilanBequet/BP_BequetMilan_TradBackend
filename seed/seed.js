const mysql = require('mysql2/promise');
const { faker } = require('@faker-js/faker');

const NUM_RECORDS = 100;

async function seedDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'coltd',
    database: 'bachelorproef',
  });

  for (let i = 0; i < NUM_RECORDS; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = faker.internet.email({ firstName: firstname, lastName: lastname });
    const phone = faker.phone.number();
    const address = faker.location.streetAddress();

    await connection.execute(
      'INSERT INTO users (firstname, lastname, email, phone, address) VALUES (?, ?, ?, ?, ?)',
      [firstname, lastname, email, phone, address]
    );
  }

  console.log(`${NUM_RECORDS} records inserted`);
  await connection.end();
}

seedDatabase().catch(console.error);

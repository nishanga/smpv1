const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5433,
  user: 'postgres',        // change to your PostgreSQL user
  password: '123',  // your PostgreSQL password
  database: 'testsmp'        // your PostgreSQL database
});

client.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Connection error", err.stack));

module.exports = client;
require('dotenv').config();
const fs = require('fs');
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await client.connect();
  const sql = fs.readFileSync('schema.sql', 'utf8');
  await client.query(sql);
  console.log('Schema created successfully');
  await client.end();
}

run().catch(console.error);

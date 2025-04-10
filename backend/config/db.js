// backend/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // ÚTIL para Render, mas cuidado em produção!
  }
});

pool.connect()
  .then(() => console.log('Conectado ao PostgreSQL!'))
  .catch((err) => console.error('Erro ao conectar no PostgreSQL:', err));

module.exports = pool;
// server.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Conexão com banco
const pool = require('./config/db');

// Middlewares globais
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Sessões com PostgreSQL
app.use(
  session({
    store: new pgSession({ pool }),
    secret: process.env.SESSION_SECRET || 'segredo123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 dia
  })
);

// Importa todas as rotas organizadas em um único arquivo
const setupRoutes = require('./routes');
setupRoutes(app);

// Rota base
app.get('/', (req, res) => {
  res.send('AsiaInList API rodando!');
});

// Start do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

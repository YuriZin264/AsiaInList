const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Conexão com banco
const pool = require('./config/db');

// Middlewares
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.use(
  session({
    store: new pgSession({ pool }),
    secret: process.env.SESSION_SECRET || 'segredo123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 dia
  })
);

// Rotas
const authRoutes = require('./routes/authRoutes');
const pingRoutes = require('./routes/pingRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', pingRoutes);

app.get('/', (req, res) => {
  res.send('AsiaInList API rodando!');
});

// Start do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

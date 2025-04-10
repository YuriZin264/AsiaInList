
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const pool = require('./config/db');

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.use(
  session({
    store: new pgSession({ pool }),
    secret: process.env.SESSION_SECRET || 'segredo123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
);

app.get('/', (req, res) => {
  res.send('AsiaInList API rodando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

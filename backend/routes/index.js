// routes/index.js
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const pingRoutes = require('./pingRoutes');
const workRoutes = require('./workRoutes');

const setupRoutes = (app) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api', pingRoutes);
  app.use('/api/works', workRoutes);
};

module.exports = setupRoutes;

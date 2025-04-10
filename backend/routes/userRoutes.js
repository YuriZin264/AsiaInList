const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

router.get('/me', authenticateToken, (req, res) => {
  res.json({ message: 'Token válido!', user: req.user });
});

module.exports = router;

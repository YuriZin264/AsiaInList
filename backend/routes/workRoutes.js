// routes/workRoutes.js
const express = require('express');
const router = express.Router();
const workController = require('../controllers/workController');
const  authenticate  = require('../middleware/authMiddleware');

router.use(authenticate);

router.get('/', workController.getAllWorks);
router.post('/', workController.createWork);
router.put('/:id', workController.updateWork);
router.delete('/:id', workController.deleteWork);

module.exports = router;

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const genericController = require('../controllers/genericController');
const controller = genericController(Student);

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/stats', controller.getStats);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router; 
const express = require('express');
const router = express.Router();
const completedInsuranceController = require('../controllers/completedInsuranceController');

// GET all completed insurance records
router.get('/', completedInsuranceController.getAllCompletedInsurance);

// GET a single completed insurance record
router.get('/:id', completedInsuranceController.getCompletedInsurance);

// POST a new completed insurance record
router.post('/', completedInsuranceController.createCompletedInsurance);

// PUT update a completed insurance record
router.put('/:id', completedInsuranceController.updateCompletedInsurance);

// DELETE a completed insurance record
router.delete('/:id', completedInsuranceController.deleteCompletedInsurance);

module.exports = router; 
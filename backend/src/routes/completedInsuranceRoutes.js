const express = require('express');
const router = express.Router();
const completedInsuranceController = require('../controllers/completedInsuranceController');

// Get all completed insurance records
router.get('/', completedInsuranceController.getAllCompletedInsurance);

// Get a single completed insurance record
router.get('/:id', completedInsuranceController.getCompletedInsuranceById);

// Create a new completed insurance record
router.post('/', completedInsuranceController.createCompletedInsurance);

// Update a completed insurance record
router.put('/:id', completedInsuranceController.updateCompletedInsurance);

// Delete a completed insurance record
router.delete('/:id', completedInsuranceController.deleteCompletedInsurance);

module.exports = router; 
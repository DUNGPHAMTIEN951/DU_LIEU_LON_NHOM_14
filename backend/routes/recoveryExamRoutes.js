const express = require('express');
const router = express.Router();
const recoveryExamController = require('../controllers/recoveryExamController');

// Get all recovery exam students
router.get('/', recoveryExamController.getAllRecoveryExamStudents);

// Get recovery exam student by ID
router.get('/:id', recoveryExamController.getRecoveryExamStudentById);

// Create new recovery exam student
router.post('/', recoveryExamController.createRecoveryExamStudent);

// Update recovery exam student
router.put('/:id', recoveryExamController.updateRecoveryExamStudent);

// Delete recovery exam student
router.delete('/:id', recoveryExamController.deleteRecoveryExamStudent);

// Get statistics
router.get('/stats/statistics', recoveryExamController.getStatistics);

module.exports = router; 
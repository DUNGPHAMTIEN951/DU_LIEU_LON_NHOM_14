const mongoose = require('mongoose');

const RecoveryExamStudentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  faculty: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  originalExamDate: {
    type: Date,
    required: true
  },
  recoveryExamDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true,
    enum: ['Bệnh', 'Tai nạn']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('RecoveryExamStudent', RecoveryExamStudentSchema); 
const mongoose = require('mongoose');

const completedInsuranceStudentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  insuranceType: {
    type: String,
    required: true
  },
  insuranceNumber: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CompletedInsuranceStudent', completedInsuranceStudentSchema); 
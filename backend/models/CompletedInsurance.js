const mongoose = require('mongoose');

const completedInsuranceSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  faculty: {
    type: String,
    required: true
  },
  paymentDate: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  insuranceNumber: {
    type: String,
    required: true,
    unique: true
  },
  validityDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CompletedInsurance', completedInsuranceSchema); 
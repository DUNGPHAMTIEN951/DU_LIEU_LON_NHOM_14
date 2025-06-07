const mongoose = require('mongoose');

const OlympicStudentSchema = new mongoose.Schema({
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
  subject: {
    type: String,
    required: true
  },
  award: {
    type: String,
    enum: ['Gold', 'Silver', 'Bronze', 'Participation'],
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  competitionName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('OlympicStudent', OlympicStudentSchema); 
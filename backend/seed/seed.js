const mongoose = require('mongoose');
const Student = require('../models/Student');
const LateInsuranceStudent = require('../models/LateInsuranceStudent');
const OlympicStudent = require('../models/OlympicStudent');
const { students, lateInsuranceStudents, olympicStudents } = require('./seedData');

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27018/studentdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear existing data
    await Student.deleteMany({});
    await LateInsuranceStudent.deleteMany({});
    await OlympicStudent.deleteMany({});

    // Insert new data
    await Student.insertMany(students);
    await LateInsuranceStudent.insertMany(lateInsuranceStudents);
    await OlympicStudent.insertMany(olympicStudents);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 
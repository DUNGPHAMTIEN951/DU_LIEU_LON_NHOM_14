const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
  scores: [{
    subject: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    semester: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

const lateInsuranceStudentSchema = new mongoose.Schema({
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
  reason: {
    type: String
  },
  note: {
    type: String
  }
}, {
  timestamps: true
});

const completedInsuranceStudentSchema = new mongoose.Schema({
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
  note: {
    type: String
  }
}, {
  timestamps: true
});

const unpaidStudentSchema = new mongoose.Schema({
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
  semester: {
    type: String,
    required: true
  },
  note: {
    type: String
  }
}, {
  timestamps: true
});

const olympicStudentSchema = new mongoose.Schema({
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
  score: {
    type: Number,
    required: true
  },
  note: {
    type: String
  }
}, {
  timestamps: true
});

const recoveryExamStudentSchema = new mongoose.Schema({
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
  class: {
    type: String
  },
  phone: {
    type: String
  },
  tuitionPaidDate: {
    type: String
  },
  submittedApplication: {
    type: String
  },
  tuitionDebt: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
module.exports.LateInsuranceStudent = mongoose.model('LateInsuranceStudent', lateInsuranceStudentSchema);
module.exports.CompletedInsuranceStudent = mongoose.model('CompletedInsuranceStudent', completedInsuranceStudentSchema);
module.exports.UnpaidStudent = mongoose.model('UnpaidStudent', unpaidStudentSchema);
module.exports.OlympicStudent = mongoose.model('OlympicStudent', olympicStudentSchema);
module.exports.RecoveryExamStudent = mongoose.model('RecoveryExamStudent', recoveryExamStudentSchema); 
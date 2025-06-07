const CompletedInsuranceStudent = require('../models/CompletedInsuranceStudent');
const CompletedInsurance = require('../models/CompletedInsurance');

// Get all completed insurance students
exports.getAllCompletedInsuranceStudents = async (req, res) => {
  try {
    const students = await CompletedInsuranceStudent.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get completed insurance student by ID
exports.getCompletedInsuranceStudentById = async (req, res) => {
  try {
    const student = await CompletedInsuranceStudent.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new completed insurance student
exports.createCompletedInsuranceStudent = async (req, res) => {
  const student = new CompletedInsuranceStudent(req.body);
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update completed insurance student
exports.updateCompletedInsuranceStudent = async (req, res) => {
  try {
    const student = await CompletedInsuranceStudent.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    Object.assign(student, req.body);
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete completed insurance student
exports.deleteCompletedInsuranceStudent = async (req, res) => {
  try {
    const student = await CompletedInsuranceStudent.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    await student.remove();
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get statistics
exports.getStatistics = async (req, res) => {
  try {
    const totalStudents = await CompletedInsuranceStudent.countDocuments();
    const totalAmount = await CompletedInsuranceStudent.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const facultyStats = await CompletedInsuranceStudent.aggregate([
      { $group: { _id: '$faculty', count: { $sum: 1 } } }
    ]);
    const monthlyStats = await CompletedInsuranceStudent.aggregate([
      {
        $group: {
          _id: { $month: '$paymentDate' },
          count: { $sum: 1 },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalStudents,
      totalAmount: totalAmount[0]?.total || 0,
      facultyStats,
      monthlyStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all completed insurance records
exports.getAllCompletedInsurance = async (req, res) => {
  try {
    const records = await CompletedInsurance.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single completed insurance record
exports.getCompletedInsurance = async (req, res) => {
  try {
    const record = await CompletedInsurance.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new completed insurance record
exports.createCompletedInsurance = async (req, res) => {
  try {
    const record = new CompletedInsurance(req.body);
    const newRecord = await record.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a completed insurance record
exports.updateCompletedInsurance = async (req, res) => {
  try {
    const record = await CompletedInsurance.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    
    Object.assign(record, req.body);
    const updatedRecord = await record.save();
    res.json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a completed insurance record
exports.deleteCompletedInsurance = async (req, res) => {
  try {
    const record = await CompletedInsurance.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    
    await record.deleteOne();
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
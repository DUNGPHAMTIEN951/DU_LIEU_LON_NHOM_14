const RecoveryExamStudent = require('../models/RecoveryExamStudent');

// Get all recovery exam students
exports.getAllRecoveryExamStudents = async (req, res) => {
  try {
    const students = await RecoveryExamStudent.find().sort({ originalExamDate: 1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recovery exam student by ID
exports.getRecoveryExamStudentById = async (req, res) => {
  try {
    const student = await RecoveryExamStudent.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new recovery exam student
exports.createRecoveryExamStudent = async (req, res) => {
  const student = new RecoveryExamStudent(req.body);
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update recovery exam student
exports.updateRecoveryExamStudent = async (req, res) => {
  try {
    const student = await RecoveryExamStudent.findById(req.params.id);
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

// Delete recovery exam student
exports.deleteRecoveryExamStudent = async (req, res) => {
  try {
    const student = await RecoveryExamStudent.findById(req.params.id);
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
    const totalStudents = await RecoveryExamStudent.countDocuments();
    const facultyStats = await RecoveryExamStudent.aggregate([
      { $group: { _id: '$faculty', count: { $sum: 1 } } }
    ]);
    const subjectStats = await RecoveryExamStudent.aggregate([
      { $group: { _id: '$subject', count: { $sum: 1 } } }
    ]);
    const statusStats = await RecoveryExamStudent.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const reasonStats = await RecoveryExamStudent.aggregate([
      { $group: { _id: '$reason', count: { $sum: 1 } } }
    ]);
    const monthlyStats = await RecoveryExamStudent.aggregate([
      {
        $group: {
          _id: { $month: '$originalExamDate' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalStudents,
      facultyStats,
      subjectStats,
      statusStats,
      reasonStats,
      monthlyStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
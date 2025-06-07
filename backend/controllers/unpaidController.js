const UnpaidStudent = require('../models/UnpaidStudent');

// Get all unpaid students
exports.getAllUnpaidStudents = async (req, res) => {
  try {
    const students = await UnpaidStudent.find().sort({ dueDate: 1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get unpaid student by ID
exports.getUnpaidStudentById = async (req, res) => {
  try {
    const student = await UnpaidStudent.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new unpaid student
exports.createUnpaidStudent = async (req, res) => {
  const student = new UnpaidStudent(req.body);
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update unpaid student
exports.updateUnpaidStudent = async (req, res) => {
  try {
    const student = await UnpaidStudent.findById(req.params.id);
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

// Delete unpaid student
exports.deleteUnpaidStudent = async (req, res) => {
  try {
    const student = await UnpaidStudent.findById(req.params.id);
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
    const totalStudents = await UnpaidStudent.countDocuments();
    const totalAmount = await UnpaidStudent.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const facultyStats = await UnpaidStudent.aggregate([
      { $group: { _id: '$faculty', count: { $sum: 1 } } }
    ]);
    const statusStats = await UnpaidStudent.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const monthlyStats = await UnpaidStudent.aggregate([
      {
        $group: {
          _id: { $month: '$dueDate' },
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
      statusStats,
      monthlyStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
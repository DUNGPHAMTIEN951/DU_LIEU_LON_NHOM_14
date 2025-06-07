const CompletedInsuranceStudent = require('../models/CompletedInsuranceStudent');

// Get all completed insurance records
exports.getAllCompletedInsurance = async (req, res) => {
  try {
    const records = await CompletedInsuranceStudent.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single completed insurance record
exports.getCompletedInsuranceById = async (req, res) => {
  try {
    const record = await CompletedInsuranceStudent.findById(req.params.id);
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
  const record = new CompletedInsuranceStudent(req.body);
  try {
    const newRecord = await record.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a completed insurance record
exports.updateCompletedInsurance = async (req, res) => {
  try {
    const record = await CompletedInsuranceStudent.findById(req.params.id);
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
    const record = await CompletedInsuranceStudent.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    await record.deleteOne();
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
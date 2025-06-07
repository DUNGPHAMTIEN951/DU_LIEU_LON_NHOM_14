const genericController = (Model) => ({
  // Create new record
  create: async (req, res) => {
    try {
      const item = new Model(req.body);
      await item.save();
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all records
  getAll: async (req, res) => {
    try {
      const items = await Model.find();
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get record by ID
  getById: async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update record
  update: async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Delete record
  delete: async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get statistics
  getStats: async (req, res) => {
    try {
      const stats = await Model.aggregate([
        {
          $group: {
            _id: '$faculty',
            count: { $sum: 1 }
          }
        }
      ]);
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

module.exports = genericController; 
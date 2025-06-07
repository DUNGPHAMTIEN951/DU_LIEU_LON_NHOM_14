import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Snackbar,
  TableSortLabel,
  InputAdornment,
  Tooltip,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

// Static data for demonstration
const mockData = [
  {
    _id: '1',
    studentId: 'SV001',
    name: 'Nguyễn Văn A',
    faculty: 'Công nghệ thông tin',
    paymentDate: '2024-03-01',
    amount: 1500000,
    insuranceNumber: 'BH001',
    validityDate: '2025-03-01'
  },
  {
    _id: '2',
    studentId: 'SV002',
    name: 'Trần Thị B',
    faculty: 'Kinh tế',
    paymentDate: '2024-02-15',
    amount: 1500000,
    insuranceNumber: 'BH002',
    validityDate: '2025-02-15'
  },
  {
    _id: '3',
    studentId: 'SV003',
    name: 'Lê Văn C',
    faculty: 'Y khoa',
    paymentDate: '2024-01-20',
    amount: 1500000,
    insuranceNumber: 'BH003',
    validityDate: '2025-01-20'
  },
  {
    _id: '4',
    studentId: 'SV004',
    name: 'Phạm Thị D',
    faculty: 'Luật',
    paymentDate: '2024-03-10',
    amount: 1500000,
    insuranceNumber: 'BH004',
    validityDate: '2025-03-10'
  },
  {
    _id: '5',
    studentId: 'SV005',
    name: 'Hoàng Văn E',
    faculty: 'Cơ khí',
    paymentDate: '2024-02-28',
    amount: 1500000,
    insuranceNumber: 'BH005',
    validityDate: '2025-02-28'
  }
];

const CompletedInsuranceTable = () => {
  const [students, setStudents] = useState(mockData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    faculty: '',
    paymentDate: '',
    amount: '',
    insuranceNumber: '',
    validityDate: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Statistics data
  const stats = {
    total: students.length,
    active: students.filter(s => new Date(s.validityDate) > new Date()).length,
    expiring: students.filter(s => {
      const validity = new Date(s.validityDate);
      const today = new Date();
      const monthsUntilExpiry = (validity - today) / (1000 * 60 * 60 * 24 * 30);
      return monthsUntilExpiry > 0 && monthsUntilExpiry < 3;
    }).length,
    expired: students.filter(s => new Date(s.validityDate) < new Date()).length
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.studentId) errors.studentId = 'Student ID is required';
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.faculty) errors.faculty = 'Faculty is required';
    if (!formData.paymentDate) errors.paymentDate = 'Payment date is required';
    if (!formData.amount) errors.amount = 'Amount is required';
    if (!formData.insuranceNumber) errors.insuranceNumber = 'Insurance number is required';
    if (!formData.validityDate) errors.validityDate = 'Validity date is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpen = (student = null) => {
    if (student) {
      setSelectedStudent(student);
      setFormData(student);
    } else {
      setSelectedStudent(null);
      setFormData({
        studentId: '',
        name: '',
        faculty: '',
        paymentDate: '',
        amount: '',
        insuranceNumber: '',
        validityDate: ''
      });
    }
    setFormErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
    setFormErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (selectedStudent) {
        // Update existing student
        const updatedStudents = students.map(s => 
          s._id === selectedStudent._id ? { ...formData, _id: s._id } : s
        );
        setStudents(updatedStudents);
        showSnackbar('Student updated successfully');
      } else {
        // Add new student
        const newStudent = {
          ...formData,
          _id: Date.now().toString(),
          amount: Number(formData.amount)
        };
        setStudents([...students, newStudent]);
        showSnackbar('Student added successfully');
      }
      handleClose();
    } catch (error) {
      showSnackbar('Error saving student: ' + error.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        setStudents(students.filter(s => s._id !== id));
        showSnackbar('Student deleted successfully');
      } catch (error) {
        showSnackbar('Error deleting student: ' + error.message, 'error');
      }
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredStudents = React.useMemo(() => {
    let filteredStudents = students.filter(student =>
      Object.values(student).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (sortConfig.key) {
      filteredStudents.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredStudents;
  }, [students, searchTerm, sortConfig]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  const getValidityStatus = (validityDate) => {
    const today = new Date();
    const validity = new Date(validityDate);
    const monthsUntilExpiry = (validity - today) / (1000 * 60 * 60 * 24 * 30);
    
    if (monthsUntilExpiry < 0) return { label: 'Expired', color: 'error' };
    if (monthsUntilExpiry < 3) return { label: 'Expiring Soon', color: 'warning' };
    return { label: 'Valid', color: 'success' };
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Completed Insurance Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{ borderRadius: 2 }}
        >
          Add New Student
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h4" component="div">
                {stats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Insurance
              </Typography>
              <Typography variant="h4" component="div">
                {stats.active}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff3e0' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Expiring Soon
              </Typography>
              <Typography variant="h4" component="div">
                {stats.expiring}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#ffebee' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Expired
              </Typography>
              <Typography variant="h4" component="div">
                {stats.expired}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search students..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'studentId'}
                    direction={sortConfig.key === 'studentId' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('studentId')}
                  >
                    Student ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'name'}
                    direction={sortConfig.key === 'name' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'faculty'}
                    direction={sortConfig.key === 'faculty' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('faculty')}
                  >
                    Faculty
                  </TableSortLabel>
                </TableCell>
                <TableCell>Payment Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Insurance Number</TableCell>
                <TableCell>Validity Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAndFilteredStudents.map((student) => {
                const status = getValidityStatus(student.validityDate);
                return (
                  <TableRow key={student._id} hover>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.faculty}</TableCell>
                    <TableCell>{new Date(student.paymentDate).toLocaleDateString()}</TableCell>
                    <TableCell>{formatCurrency(student.amount)}</TableCell>
                    <TableCell>{student.insuranceNumber}</TableCell>
                    <TableCell>{new Date(student.validityDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip 
                        label={status.label}
                        color={status.color}
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleOpen(student)} color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(student._id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
          {selectedStudent ? 'Edit Student' : 'Add New Student'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="studentId"
              label="Student ID"
              value={formData.studentId}
              onChange={handleChange}
              error={!!formErrors.studentId}
              helperText={formErrors.studentId}
              fullWidth
              required
            />
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              fullWidth
              required
            />
            <TextField
              name="faculty"
              label="Faculty"
              value={formData.faculty}
              onChange={handleChange}
              error={!!formErrors.faculty}
              helperText={formErrors.faculty}
              fullWidth
              required
            />
            <TextField
              name="paymentDate"
              label="Payment Date"
              type="date"
              value={formData.paymentDate}
              onChange={handleChange}
              error={!!formErrors.paymentDate}
              helperText={formErrors.paymentDate}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="amount"
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              error={!!formErrors.amount}
              helperText={formErrors.amount}
              fullWidth
              required
            />
            <TextField
              name="insuranceNumber"
              label="Insurance Number"
              value={formData.insuranceNumber}
              onChange={handleChange}
              error={!!formErrors.insuranceNumber}
              helperText={formErrors.insuranceNumber}
              fullWidth
              required
            />
            <TextField
              name="validityDate"
              label="Validity Date"
              type="date"
              value={formData.validityDate}
              onChange={handleChange}
              error={!!formErrors.validityDate}
              helperText={formErrors.validityDate}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: '#f5f5f5', borderTop: '1px solid #e0e0e0' }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedStudent ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CompletedInsuranceTable; 
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
  Tooltip,
  Fade,
  Zoom,
  useTheme,
  alpha
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import axios from 'axios';

const LateInsuranceTable = () => {
  const theme = useTheme();
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    faculty: '',
    paymentDate: '',
    amount: '',
    insuranceNumber: '',
    validityDate: '',
    lateDays: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/late-insurance');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
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
        validityDate: '',
        lateDays: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedStudent) {
        await axios.put(`http://localhost:5000/api/late-insurance/${selectedStudent._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/late-insurance', formData);
      }
      fetchStudents();
      handleClose();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/late-insurance/${id}`);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getLateDaysColor = (days) => {
    const numDays = parseInt(days);
    if (numDays <= 7) return 'success';
    if (numDays <= 14) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
          p: 2,
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.warning.main, 0.1)
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="warning" sx={{ fontSize: 32 }} />
          <Typography variant="h5" color="warning.dark" fontWeight="bold">
            Late Insurance Students
          </Typography>
        </Box>
        <Tooltip title="Add New Student" TransitionComponent={Zoom}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleOpen()}
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: 3,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 6,
              },
              transition: 'all 0.3s'
            }}
          >
            Add Student
          </Button>
        </Tooltip>
      </Box>

      <TableContainer 
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          '& .MuiTableHead-root': {
            backgroundColor: alpha(theme.palette.warning.main, 0.1)
          }
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Student ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Faculty</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Payment Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Insurance Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Validity Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Late Days</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow 
                key={student._id}
                sx={{
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.warning.main, 0.05),
                  },
                  transition: 'background-color 0.3s'
                }}
              >
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.faculty}</TableCell>
                <TableCell>{new Date(student.paymentDate).toLocaleDateString()}</TableCell>
                <TableCell>{formatCurrency(student.amount)}</TableCell>
                <TableCell>{student.insuranceNumber}</TableCell>
                <TableCell>{new Date(student.validityDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip
                    label={`${student.lateDays} days`}
                    color={getLateDaysColor(student.lateDays)}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Edit" TransitionComponent={Zoom}>
                      <IconButton 
                        onClick={() => handleOpen(student)} 
                        color="warning"
                        size="small"
                        sx={{
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.warning.main, 0.1),
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.3s'
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" TransitionComponent={Zoom}>
                      <IconButton 
                        onClick={() => handleDelete(student._id)} 
                        color="error"
                        size="small"
                        sx={{
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.error.main, 0.1),
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.3s'
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 6
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: alpha(theme.palette.warning.main, 0.1),
          borderBottom: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
        }}>
          {selectedStudent ? 'Edit Student' : 'Add New Student'}
        </DialogTitle>
        <DialogContent>
          <Box 
            component="form" 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2, 
              pt: 2 
            }}
          >
            <TextField
              name="studentId"
              label="Student ID"
              value={formData.studentId}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              name="faculty"
              label="Faculty"
              value={formData.faculty}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              name="paymentDate"
              label="Payment Date"
              type="date"
              value={formData.paymentDate}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              name="amount"
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              name="insuranceNumber"
              label="Insurance Number"
              value={formData.insuranceNumber}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              name="validityDate"
              label="Validity Date"
              type="date"
              value={formData.validityDate}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              name="lateDays"
              label="Late Days"
              type="number"
              value={formData.lateDays}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: 2,
          borderTop: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
        }}>
          <Button 
            onClick={handleClose}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="warning"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3,
              },
              transition: 'all 0.3s'
            }}
          >
            {selectedStudent ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LateInsuranceTable; 
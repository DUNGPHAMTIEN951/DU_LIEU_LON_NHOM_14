import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Tooltip,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Assignment as ExamIcon,
  School as SchoolIcon,
  DateRange as DateRangeIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';

// Mock data for exams
const mockExams = [
  {
    id: 1,
    examId: 'EXAM001',
    name: 'Midterm Exam - Mathematics',
    subject: 'Mathematics',
    date: '2024-04-15',
    startTime: '08:00',
    duration: 120,
    location: 'Room A101',
    status: 'upcoming',
    totalStudents: 50,
    maxStudents: 60,
  },
  {
    id: 2,
    examId: 'EXAM002',
    name: 'Final Exam - Physics',
    subject: 'Physics',
    date: '2024-04-20',
    startTime: '13:00',
    duration: 180,
    location: 'Room B203',
    status: 'upcoming',
    totalStudents: 45,
    maxStudents: 50,
  },
  {
    id: 3,
    examId: 'EXAM003',
    name: 'Quiz - Computer Science',
    subject: 'Computer Science',
    date: '2024-03-25',
    startTime: '09:00',
    duration: 60,
    location: 'Computer Lab',
    status: 'completed',
    totalStudents: 30,
    maxStudents: 30,
  },
];

const Exams = () => {
  const [exams, setExams] = useState(mockExams);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('date');
  const [order, setOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    date: '',
    startTime: '',
    duration: '',
    location: '',
    maxStudents: '',
  });

  // Calculate statistics
  const stats = {
    totalExams: exams.length,
    upcomingExams: exams.filter(e => e.status === 'upcoming').length,
    completedExams: exams.filter(e => e.status === 'completed').length,
    totalStudents: exams.reduce((sum, e) => sum + e.totalStudents, 0),
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleOpen = (exam = null) => {
    if (exam) {
      setSelectedExam(exam);
      setFormData(exam);
    } else {
      setSelectedExam(null);
      setFormData({
        name: '',
        subject: '',
        date: '',
        startTime: '',
        duration: '',
        location: '',
        maxStudents: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedExam(null);
  };

  const handleSubmit = () => {
    if (selectedExam) {
      // Update existing exam
      setExams(exams.map(e => 
        e.id === selectedExam.id ? { ...formData, id: e.id, examId: e.examId, status: e.status, totalStudents: e.totalStudents } : e
      ));
    } else {
      // Add new exam
      const newExam = {
        ...formData,
        id: exams.length + 1,
        examId: `EXAM${String(exams.length + 1).padStart(3, '0')}`,
        status: 'upcoming',
        totalStudents: 0,
        maxStudents: Number(formData.maxStudents),
        duration: Number(formData.duration),
      };
      setExams([...exams, newExam]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(e => e.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'info';
      case 'ongoing':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const filteredExams = exams
    .filter(exam =>
      Object.values(exam).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (order === 'asc') {
        return a[orderBy] > b[orderBy] ? 1 : -1;
      } else {
        return a[orderBy] < b[orderBy] ? 1 : -1;
      }
    });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Exam Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Schedule New Exam
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ExamIcon sx={{ color: '#1976d2', mr: 1 }} />
                <Typography color="textSecondary">Total Exams</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats.totalExams}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DateRangeIcon sx={{ color: '#2e7d32', mr: 1 }} />
                <Typography color="textSecondary">Upcoming</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats.upcomingExams}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff3e0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ExamIcon sx={{ color: '#f57c00', mr: 1 }} />
                <Typography color="textSecondary">Completed</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats.completedExams}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#f3e5f5' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ color: '#7b1fa2', mr: 1 }} />
                <Typography color="textSecondary">Total Students</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats.totalStudents}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search exams..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'examId'}
                    direction={orderBy === 'examId' ? order : 'asc'}
                    onClick={() => handleSort('examId')}
                  >
                    Exam ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={orderBy === 'date' ? order : 'asc'}
                    onClick={() => handleSort('date')}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Students</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExams
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((exam) => (
                  <TableRow key={exam.id} hover>
                    <TableCell>{exam.examId}</TableCell>
                    <TableCell>{exam.name}</TableCell>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>{new Date(exam.date).toLocaleDateString()}</TableCell>
                    <TableCell>{exam.startTime}</TableCell>
                    <TableCell>{formatDuration(exam.duration)}</TableCell>
                    <TableCell>{exam.location}</TableCell>
                    <TableCell>
                      {exam.totalStudents}/{exam.maxStudents}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={exam.status}
                        color={getStatusColor(exam.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleOpen(exam)} color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(exam.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredExams.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedExam ? 'Edit Exam' : 'Schedule New Exam'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Exam Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select
                value={formData.subject}
                label="Subject"
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              >
                <MenuItem value="Mathematics">Mathematics</MenuItem>
                <MenuItem value="Physics">Physics</MenuItem>
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Chemistry">Chemistry</MenuItem>
                <MenuItem value="Biology">Biology</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Start Time"
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Duration (minutes)"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              fullWidth
            />
            <TextField
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              fullWidth
            />
            <TextField
              label="Maximum Students"
              type="number"
              value={formData.maxStudents}
              onChange={(e) => setFormData({ ...formData, maxStudents: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedExam ? 'Update' : 'Schedule'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Exams; 
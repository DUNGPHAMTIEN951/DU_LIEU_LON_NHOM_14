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
  EmojiEvents as OlympicIcon,
  School as SchoolIcon,
  DateRange as DateRangeIcon,
} from '@mui/icons-material';

// Mock data for Olympic competitions
const mockOlympics = [
  {
    id: 1,
    competitionId: 'OLY001',
    name: 'Olympic Toán học',
    category: 'Mathematics',
    startDate: '2024-04-01',
    endDate: '2024-04-03',
    location: 'Hội trường A',
    status: 'upcoming',
    participants: 150,
    maxParticipants: 200,
  },
  {
    id: 2,
    competitionId: 'OLY002',
    name: 'Olympic Vật lý',
    category: 'Physics',
    startDate: '2024-04-05',
    endDate: '2024-04-07',
    location: 'Hội trường B',
    status: 'upcoming',
    participants: 120,
    maxParticipants: 150,
  },
  {
    id: 3,
    competitionId: 'OLY003',
    name: 'Olympic Tin học',
    category: 'Computer Science',
    startDate: '2024-03-15',
    endDate: '2024-03-17',
    location: 'Phòng máy tính',
    status: 'completed',
    participants: 100,
    maxParticipants: 100,
  },
];

const Olympic = () => {
  const [olympics, setOlympics] = useState(mockOlympics);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('startDate');
  const [order, setOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedOlympic, setSelectedOlympic] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    startDate: '',
    endDate: '',
    location: '',
    maxParticipants: '',
  });

  // Calculate statistics
  const stats = {
    totalCompetitions: olympics.length,
    upcomingCompetitions: olympics.filter(o => o.status === 'upcoming').length,
    completedCompetitions: olympics.filter(o => o.status === 'completed').length,
    totalParticipants: olympics.reduce((sum, o) => sum + o.participants, 0),
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

  const handleOpen = (olympic = null) => {
    if (olympic) {
      setSelectedOlympic(olympic);
      setFormData(olympic);
    } else {
      setSelectedOlympic(null);
      setFormData({
        name: '',
        category: '',
        startDate: '',
        endDate: '',
        location: '',
        maxParticipants: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOlympic(null);
  };

  const handleSubmit = () => {
    if (selectedOlympic) {
      // Update existing competition
      setOlympics(olympics.map(o => 
        o.id === selectedOlympic.id ? { ...formData, id: o.id, competitionId: o.competitionId, status: o.status, participants: o.participants } : o
      ));
    } else {
      // Add new competition
      const newOlympic = {
        ...formData,
        id: olympics.length + 1,
        competitionId: `OLY${String(olympics.length + 1).padStart(3, '0')}`,
        status: 'upcoming',
        participants: 0,
        maxParticipants: Number(formData.maxParticipants),
      };
      setOlympics([...olympics, newOlympic]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this competition?')) {
      setOlympics(olympics.filter(o => o.id !== id));
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

  const filteredOlympics = olympics
    .filter(olympic =>
      Object.values(olympic).some(value =>
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
          Olympic Competitions
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add New Competition
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <OlympicIcon sx={{ color: '#1976d2', mr: 1 }} />
                <Typography color="textSecondary">Total Competitions</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats.totalCompetitions}
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
                {stats.upcomingCompetitions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff3e0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <OlympicIcon sx={{ color: '#f57c00', mr: 1 }} />
                <Typography color="textSecondary">Completed</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats.completedCompetitions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#f3e5f5' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ color: '#7b1fa2', mr: 1 }} />
                <Typography color="textSecondary">Total Participants</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats.totalParticipants}
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
            placeholder="Search competitions..."
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
                    active={orderBy === 'competitionId'}
                    direction={orderBy === 'competitionId' ? order : 'asc'}
                    onClick={() => handleSort('competitionId')}
                  >
                    Competition ID
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
                <TableCell>Category</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'startDate'}
                    direction={orderBy === 'startDate' ? order : 'asc'}
                    onClick={() => handleSort('startDate')}
                  >
                    Start Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Participants</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOlympics
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((olympic) => (
                  <TableRow key={olympic.id} hover>
                    <TableCell>{olympic.competitionId}</TableCell>
                    <TableCell>{olympic.name}</TableCell>
                    <TableCell>{olympic.category}</TableCell>
                    <TableCell>{new Date(olympic.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(olympic.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>{olympic.location}</TableCell>
                    <TableCell>
                      {olympic.participants}/{olympic.maxParticipants}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={olympic.status}
                        color={getStatusColor(olympic.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleOpen(olympic)} color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(olympic.id)} color="error">
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
          count={filteredOlympics.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedOlympic ? 'Edit Competition' : 'Add New Competition'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Competition Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <MenuItem value="Mathematics">Mathematics</MenuItem>
                <MenuItem value="Physics">Physics</MenuItem>
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Chemistry">Chemistry</MenuItem>
                <MenuItem value="Biology">Biology</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              fullWidth
            />
            <TextField
              label="Maximum Participants"
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedOlympic ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Olympic; 
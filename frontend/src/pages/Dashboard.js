import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  People as PeopleIcon,
  LocalHospital as InsuranceIcon,
  Payment as PaymentIcon,
  EmojiEvents as OlympicIcon,
  Assignment as ExamIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Notifications as NotificationsIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for charts
const studentData = [
  { name: 'Jan', students: 4000 },
  { name: 'Feb', students: 3000 },
  { name: 'Mar', students: 2000 },
  { name: 'Apr', students: 2780 },
  { name: 'May', students: 1890 },
  { name: 'Jun', students: 2390 },
];

const insuranceData = [
  { name: 'Active', value: 70 },
  { name: 'Expired', value: 20 },
  { name: 'Pending', value: 10 },
];

const paymentData = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 2000 },
  { name: 'Apr', amount: 2780 },
  { name: 'May', amount: 1890 },
  { name: 'Jun', amount: 2390 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    type: 'student',
    action: 'New student registered',
    time: '2 hours ago',
    details: 'John Doe - Computer Science',
  },
  {
    id: 2,
    type: 'insurance',
    action: 'Insurance renewed',
    time: '3 hours ago',
    details: 'Jane Smith - Policy #12345',
  },
  {
    id: 3,
    type: 'payment',
    action: 'Payment received',
    time: '5 hours ago',
    details: 'Mike Johnson - $500',
  },
  {
    id: 4,
    type: 'exam',
    action: 'Exam scheduled',
    time: '1 day ago',
    details: 'Final Exam - Mathematics',
  },
];

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
        Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ color: '#1976d2', mr: 1 }} />
                <Typography color="textSecondary">Total Students</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                2,500
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUpIcon sx={{ color: '#4caf50', mr: 0.5 }} />
                <Typography variant="body2" color="success.main">
                  +12% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <InsuranceIcon sx={{ color: '#2e7d32', mr: 1 }} />
                <Typography color="textSecondary">Active Insurance</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                1,800
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUpIcon sx={{ color: '#4caf50', mr: 0.5 }} />
                <Typography variant="body2" color="success.main">
                  +8% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff3e0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaymentIcon sx={{ color: '#f57c00', mr: 1 }} />
                <Typography color="textSecondary">Pending Payments</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                150
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingDownIcon sx={{ color: '#f44336', mr: 0.5 }} />
                <Typography variant="body2" color="error.main">
                  -5% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#f3e5f5' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <OlympicIcon sx={{ color: '#7b1fa2', mr: 1 }} />
                <Typography color="textSecondary">Olympic Participants</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                120
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUpIcon sx={{ color: '#4caf50', mr: 0.5 }} />
                <Typography variant="body2" color="success.main">
                  +15% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title="Student Registration Trends"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={studentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="#1976d2"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title="Insurance Status"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={insuranceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {insuranceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activities and Quick Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title="Recent Activities"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <List>
              {recentActivities.map((activity) => (
                <React.Fragment key={activity.id}>
                  <ListItem>
                    <ListItemIcon>
                      {activity.type === 'student' && <PeopleIcon color="primary" />}
                      {activity.type === 'insurance' && <InsuranceIcon color="success" />}
                      {activity.type === 'payment' && <PaymentIcon color="warning" />}
                      {activity.type === 'exam' && <ExamIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.action}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="textPrimary">
                            {activity.details}
                          </Typography>
                          {' — '}
                          {activity.time}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Quick Actions" />
            <Divider />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  fullWidth
                >
                  Add New Student
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<InsuranceIcon />}
                  fullWidth
                >
                  Register Insurance
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<PaymentIcon />}
                  fullWidth
                >
                  Record Payment
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ExamIcon />}
                  fullWidth
                >
                  Schedule Exam
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card sx={{ mt: 3 }}>
            <CardHeader title="Upcoming Events" />
            <Divider />
            <List>
              <ListItem>
                <ListItemIcon>
                  <CalendarIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Final Exams"
                  secondary="Starts in 2 weeks"
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemIcon>
                  <OlympicIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Olympic Competition"
                  secondary="Next month"
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Insurance Renewal Deadline"
                  secondary="In 5 days"
                />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 
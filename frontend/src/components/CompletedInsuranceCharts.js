import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const CompletedInsuranceCharts = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalAmount: 0,
    facultyStats: [],
    monthlyStats: []
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/completed-insurance/stats/statistics');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Total Students and Amount
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
                  <Typography variant="h4">{stats.totalStudents}</Typography>
                  <Typography variant="subtitle1">Total Students</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
                  <Typography variant="h4">{formatCurrency(stats.totalAmount)}</Typography>
                  <Typography variant="subtitle1">Total Amount</Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Students by Faculty
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={stats.facultyStats}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {stats.facultyStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Statistics
            </Typography>
            <BarChart
              width={800}
              height={300}
              data={stats.monthlyStats}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="count" name="Number of Students" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="total" name="Total Amount" fill="#82ca9d" />
            </BarChart>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CompletedInsuranceCharts; 
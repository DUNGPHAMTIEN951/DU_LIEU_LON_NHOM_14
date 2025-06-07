import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import axios from 'axios';
import CrudTable from '../../components/CrudTable';
import StudentChart from './StudentChart';

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'studentId', headerName: 'MSSV' },
    { field: 'name', headerName: 'Họ tên' },
    { field: 'faculty', headerName: 'Khoa' },
    { field: 'subject', headerName: 'Môn học' },
    { field: 'score', headerName: 'Điểm' },
    { field: 'year', headerName: 'Năm' }
  ];

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  const handleAdd = () => {
    // TODO: Implement add functionality
  };

  const handleEdit = (student) => {
    // TODO: Implement edit functionality
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <CrudTable
              title="Quản lý Sinh viên"
              columns={columns}
              data={students}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <StudentChart data={students} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentPage; 
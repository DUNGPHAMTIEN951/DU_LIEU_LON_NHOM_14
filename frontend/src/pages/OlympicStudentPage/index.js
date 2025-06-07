import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import axios from 'axios';
import CrudTable from '../../components/CrudTable';
import OlympicChart from './OlympicChart';

const OlympicStudentPage = () => {
  const [olympicStudents, setOlympicStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'studentId', headerName: 'MSSV' },
    { field: 'name', headerName: 'Họ tên' },
    { field: 'faculty', headerName: 'Khoa' },
    { field: 'subject', headerName: 'Môn thi' },
    { field: 'award', headerName: 'Giải thưởng' },
    { field: 'year', headerName: 'Năm' },
    { field: 'competitionName', headerName: 'Cuộc thi' }
  ];

  useEffect(() => {
    fetchOlympicStudents();
  }, []);

  const fetchOlympicStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/olympic-students');
      setOlympicStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching olympic students:', error);
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
      await axios.delete(`http://localhost:5000/api/olympic-students/${id}`);
      fetchOlympicStudents();
    } catch (error) {
      console.error('Error deleting olympic student:', error);
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
              title="Quản lý Sinh viên Olympic"
              columns={columns}
              data={olympicStudents}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <OlympicChart data={olympicStudents} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OlympicStudentPage; 
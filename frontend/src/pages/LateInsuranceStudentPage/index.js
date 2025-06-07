import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import axios from 'axios';
import CrudTable from '../../components/CrudTable';
import LateInsuranceChart from './LateInsuranceChart';

const LateInsuranceStudentPage = () => {
  const [lateInsuranceStudents, setLateInsuranceStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'studentId', headerName: 'MSSV' },
    { field: 'name', headerName: 'Họ tên' },
    { field: 'faculty', headerName: 'Khoa' },
    { field: 'paymentDate', headerName: 'Ngày đóng' },
    { field: 'amount', headerName: 'Số tiền' },
    { field: 'status', headerName: 'Trạng thái' }
  ];

  useEffect(() => {
    fetchLateInsuranceStudents();
  }, []);

  const fetchLateInsuranceStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/late-insurance-students');
      setLateInsuranceStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching late insurance students:', error);
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
      await axios.delete(`http://localhost:5000/api/late-insurance-students/${id}`);
      fetchLateInsuranceStudents();
    } catch (error) {
      console.error('Error deleting late insurance student:', error);
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
              title="Quản lý Sinh viên đóng muộn BHYT"
              columns={columns}
              data={lateInsuranceStudents}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <LateInsuranceChart data={lateInsuranceStudents} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LateInsuranceStudentPage; 
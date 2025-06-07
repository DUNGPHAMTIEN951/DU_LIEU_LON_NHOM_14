import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  CircularProgress
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
import Sidebar from './Sidebar';
import { styled } from '@mui/material/styles';
import CompletedInsuranceTable from './components/CompletedInsuranceTable';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const DashboardSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  background: '#fff',
}));

const DashboardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 32,
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  letterSpacing: 1,
}));

const UploadButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  fontSize: 18,
  borderRadius: 12,
  marginBottom: theme.spacing(2),
}));

function App() {
  const [students, setStudents] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [lateInsurance, setLateInsurance] = useState([]);
  const [completedInsurance, setCompletedInsurance] = useState([]);
  const [unpaidStudents, setUnpaidStudents] = useState([]);
  const [olympicStudents, setOlympicStudents] = useState([]);
  const [recoveryExamStudents, setRecoveryExamStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('/');

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (page === '/') {
        const [studentsRes, statsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/students'),
          axios.get('http://localhost:5000/api/statistics')
        ]);
        setStudents(studentsRes.data);
        setStatistics(statsRes.data);
      } else if (page === '/late-insurance') {
        const res = await axios.get('http://localhost:5000/api/late-insurance-students');
        setLateInsurance(res.data);
      } else if (page === '/completed-insurance') {
        const res = await axios.get('http://localhost:5000/api/completed-insurance-students');
        setCompletedInsurance(res.data);
      } else if (page === '/unpaid-students') {
        const res = await axios.get('http://localhost:5000/api/unpaid-students');
        setUnpaidStudents(res.data);
      } else if (page === '/olympic-students') {
        const res = await axios.get('http://localhost:5000/api/olympic-students');
        setOlympicStudents(res.data);
      } else if (page === '/recovery-exam-students') {
        const res = await axios.get('http://localhost:5000/api/recovery-exam-students');
        setRecoveryExamStudents(res.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    setLoading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);
        await axios.post('http://localhost:5000/api/upload', formData);
      }
      fetchData();
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSubjectChart = (subject) => {
    const data = subject.faculties.map(f => ({
      name: f.faculty,
      value: f.avgScore
    }));

    return (
      <Paper elevation={3} sx={{ p: 2, m: 2 }}>
        <Typography variant="h6">{subject._id}</Typography>
        <Typography variant="subtitle1">
          Overall Average: {subject.overallAvg.toFixed(2)}
        </Typography>
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" name="Average Score" />
        </BarChart>
      </Paper>
    );
  };

  const renderFacultyDistribution = () => {
    const facultyCount = students.reduce((acc, student) => {
      acc[student.faculty] = (acc[student.faculty] || 0) + 1;
      return acc;
    }, {});

    const data = Object.entries(facultyCount).map(([name, value]) => ({
      name,
      value
    }));

    return (
      <Paper elevation={3} sx={{ p: 2, m: 2 }}>
        <Typography variant="h6">Student Distribution by Faculty</Typography>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Paper>
    );
  };

  const renderScoreDistribution = () => {
    const allScores = students.flatMap(s => s.scores.map(sc => sc.score));
    const bins = [0, 3, 5, 6.5, 8, 10];
    const binLabels = ['<3', '3-5', '5-6.5', '6.5-8', '8-10'];
    const binCounts = [0, 0, 0, 0, 0];
    allScores.forEach(score => {
      if (score < 3) binCounts[0]++;
      else if (score < 5) binCounts[1]++;
      else if (score < 6.5) binCounts[2]++;
      else if (score < 8) binCounts[3]++;
      else binCounts[4]++;
    });
    const data = binLabels.map((label, i) => ({ label, value: binCounts[i] }));
    return (
      <Paper elevation={3} sx={{ p: 2, m: 2 }}>
        <Typography variant="h6">Phân bố điểm số toàn hệ</Typography>
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" name="Số lượng" />
        </BarChart>
      </Paper>
    );
  };

  const renderTopFaculties = () => {
    const facultyScores = {};
    students.forEach(s => {
      if (!facultyScores[s.faculty]) facultyScores[s.faculty] = [];
      s.scores.forEach(sc => facultyScores[s.faculty].push(sc.score));
    });
    const avgData = Object.entries(facultyScores).map(([faculty, scores]) => ({
      faculty,
      avg: scores.reduce((a, b) => a + b, 0) / scores.length
    }));
    avgData.sort((a, b) => b.avg - a.avg);
    return (
      <Paper elevation={3} sx={{ p: 2, m: 2 }}>
        <Typography variant="h6">Top khoa có điểm trung bình cao nhất/thấp nhất</Typography>
        <BarChart width={600} height={300} data={avgData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="faculty" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avg" fill="#8884d8" name="Điểm TB" />
        </BarChart>
      </Paper>
    );
  };

  const renderTopSubjects = () => {
    const subjectScores = {};
    students.forEach(s => {
      s.scores.forEach(sc => {
        if (!subjectScores[sc.subject]) subjectScores[sc.subject] = [];
        subjectScores[sc.subject].push(sc.score);
      });
    });
    const avgData = Object.entries(subjectScores).map(([subject, scores]) => ({
      subject,
      avg: scores.reduce((a, b) => a + b, 0) / scores.length
    }));
    avgData.sort((a, b) => b.avg - a.avg);
    return (
      <Paper elevation={3} sx={{ p: 2, m: 2 }}>
        <Typography variant="h6">Top môn học có điểm trung bình cao nhất/thấp nhất</Typography>
        <BarChart width={600} height={300} data={avgData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avg" fill="#ffc658" name="Điểm TB" />
        </BarChart>
      </Paper>
    );
  };

  const renderLateInsurance = () => (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ my: 2 }}>Danh sách sinh viên đóng muộn BHYT</Typography>
      <Paper sx={{ p: 2 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Mã sinh viên</th>
              <th>Họ và tên</th>
              <th>Khoa/Lớp</th>
              <th>Lý do</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {lateInsurance.map((s) => (
              <tr key={s._id}>
                <td>{s.studentId}</td>
                <td>{s.name}</td>
                <td>{s.faculty}</td>
                <td>{s.reason}</td>
                <td>{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </Container>
  );

  const renderCompletedInsurance = () => (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ my: 2 }}>Danh sách sinh viên hoàn thành đóng BHYT</Typography>
      <Paper sx={{ p: 2 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Mã sinh viên</th>
              <th>Họ và tên</th>
              <th>Khoa/Lớp</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {completedInsurance.map((s) => (
              <tr key={s._id}>
                <td>{s.studentId}</td>
                <td>{s.name}</td>
                <td>{s.faculty}</td>
                <td>{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </Container>
  );

  const renderUnpaidStudents = () => (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ my: 2 }}>Danh sách sinh viên chưa hoàn thành học phí</Typography>
      <Paper sx={{ p: 2 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Mã sinh viên</th>
              <th>Họ và tên</th>
              <th>Khoa/Lớp</th>
              <th>Học kỳ</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {unpaidStudents.map((s) => (
              <tr key={s._id}>
                <td>{s.studentId}</td>
                <td>{s.name}</td>
                <td>{s.faculty}</td>
                <td>{s.semester}</td>
                <td>{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </Container>
  );

  const renderOlympicStudents = () => (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ my: 2 }}>Danh sách sinh viên tham gia Olympic</Typography>
      <Paper sx={{ p: 2 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Mã sinh viên</th>
              <th>Họ và tên</th>
              <th>Khoa/Lớp</th>
              <th>Môn học</th>
              <th>Điểm</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {olympicStudents.map((s) => (
              <tr key={s._id}>
                <td>{s.studentId}</td>
                <td>{s.name}</td>
                <td>{s.faculty}</td>
                <td>{s.subject}</td>
                <td>{s.score}</td>
                <td>{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </Container>
  );

  const renderRecoveryExamStudents = () => (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ my: 2 }}>Danh sách sinh viên phục hồi lịch thi (BHYT)</Typography>
      <Paper sx={{ p: 2 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>MSSV</th>
              <th>Họ và tên</th>
              <th>Khoa</th>
              <th>Lớp</th>
              <th>SĐT</th>
              <th>Thời gian nộp học phí</th>
              <th>Nộp đơn</th>
              <th>Nợ học phí</th>
            </tr>
          </thead>
          <tbody>
            {recoveryExamStudents.map((s) => (
              <tr key={s._id}>
                <td>{s.studentId}</td>
                <td>{s.name}</td>
                <td>{s.faculty}</td>
                <td>{s.class}</td>
                <td>{s.phone}</td>
                <td>{s.tuitionPaidDate}</td>
                <td>{s.submittedApplication}</td>
                <td>{s.tuitionDebt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </Container>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      );
    }

    switch (page) {
      case '/':
        return (
          <Container maxWidth="lg">
            <DashboardTitle>Student Analysis Dashboard</DashboardTitle>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <UploadButton
                  variant="contained"
                  component="label"
                  color="primary"
                >
                  Upload Excel Files
                  <input
                    type="file"
                    hidden
                    multiple
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                  />
                </UploadButton>
              </Grid>
              <Grid item xs={12} md={6}>
                {renderFacultyDistribution()}
              </Grid>
              <Grid item xs={12} md={6}>
                {renderScoreDistribution()}
              </Grid>
              <Grid item xs={12}>
                {renderTopFaculties()}
              </Grid>
              <Grid item xs={12}>
                {renderTopSubjects()}
              </Grid>
              {statistics.map(subject => (
                <Grid item xs={12} md={6} key={subject._id}>
                  {renderSubjectChart(subject)}
                </Grid>
              ))}
            </Grid>
          </Container>
        );
      case '/completed-insurance':
        return <CompletedInsuranceTable />;
      case '/late-insurance':
        return renderLateInsurance();
      case '/unpaid-students':
        return renderUnpaidStudents();
      case '/olympic-students':
        return renderOlympicStudents();
      case '/recovery-exam-students':
        return renderRecoveryExamStudents();
      default:
        return <Typography>Page not found</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar currentPage={page} onPageChange={setPage} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {renderContent()}
      </Box>
    </Box>
  );
}

export default App; 
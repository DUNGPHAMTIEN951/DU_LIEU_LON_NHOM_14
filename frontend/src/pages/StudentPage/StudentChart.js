import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const StudentChart = ({ data }) => {
  // Tính toán dữ liệu cho biểu đồ
  const facultyData = data.reduce((acc, student) => {
    const faculty = student.faculty;
    if (!acc[faculty]) {
      acc[faculty] = {
        faculty,
        totalStudents: 0,
        averageScore: 0,
        totalScore: 0
      };
    }
    acc[faculty].totalStudents += 1;
    acc[faculty].totalScore += student.score;
    acc[faculty].averageScore = acc[faculty].totalScore / acc[faculty].totalStudents;
    return acc;
  }, {});

  const chartData = Object.values(facultyData);

  return (
    <div>
      <h3>Thống kê theo Khoa</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="faculty" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="totalStudents" name="Số sinh viên" fill="#8884d8" />
          <Bar yAxisId="right" dataKey="averageScore" name="Điểm trung bình" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentChart; 
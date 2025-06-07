import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const LateInsuranceChart = ({ data }) => {
  // Tính toán dữ liệu cho biểu đồ
  const monthlyData = data.reduce((acc, student) => {
    const date = new Date(student.paymentDate);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = {
        monthYear,
        totalAmount: 0,
        count: 0
      };
    }
    
    acc[monthYear].totalAmount += student.amount;
    acc[monthYear].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(monthlyData).sort((a, b) => {
    const [aMonth, aYear] = a.monthYear.split('/');
    const [bMonth, bYear] = b.monthYear.split('/');
    return new Date(aYear, aMonth) - new Date(bYear, bMonth);
  });

  return (
    <div>
      <h3>Thống kê đóng BHYT theo tháng</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthYear" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="totalAmount"
            name="Tổng tiền"
            stroke="#8884d8"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="count"
            name="Số lượng"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LateInsuranceChart; 
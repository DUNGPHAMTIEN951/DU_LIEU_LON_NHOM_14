import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const OlympicChart = ({ data }) => {
  // Tính toán dữ liệu cho biểu đồ
  const awardData = data.reduce((acc, student) => {
    const award = student.award;
    if (!acc[award]) {
      acc[award] = 0;
    }
    acc[award]++;
    return acc;
  }, {});

  const chartData = Object.entries(awardData).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div>
      <h3>Phân bố Giải thưởng Olympic</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OlympicChart; 
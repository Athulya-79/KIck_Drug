// Dashboard.jsx
import React from 'react';
import {
  PieChart, Pie, Cell, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const genderData = [
  { name: 'Men', value: 19512 },
  { name: 'Women', value: 10452 },
  { name: 'Others', value: 81 }
];

const categoryData = [
  { name: 'Cat 01', value: 19512 },
  { name: 'Cat 02', value: 10452 },
  { name: 'Cat 03', value: 681 }
];

const COLORS = ['#00C49F', '#FFBB28', '#8884d8'];

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
      <div style={{ width: '250px',flexShrink: 0, backgroundColor: '#f8f9fa' }}>
        <Sidebar />
      </div>

      {/* Right side with Navbar and Charts */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f0fefa' }}>
      <div style={{ flexShrink: 0 }}>
          <Navbar />
        </div>
        <div style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            // flexDirection: 'row',
            gap: '20px',
            justifyContent: 'center',
            marginTop:'70px',
            padding: '20px',
            background: '#ffffff',
            border: '2px solid #e0e0e0',
            borderRadius: '16px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '1200px',
            
          }}>
            {/* Gender Details */}
            <div style={{
              flex: 1, padding: '20px', background: '#effdfa', borderRadius: '12px', minWidth: '280px',display: 'flex',flexDirection: 'column',justifyContent: 'center', alignItems: 'center', height: '100%',maxWidth: '500px',  margin: 'auto',   }}>
              <h2 style={{ textAlign: 'center', color: '#008037' }}>Gender Details</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    label={({ name, value }) => `${name} ${value}`}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Legend formatter={(value, entry, index) => {
                    const total = genderData.reduce((sum, d) => sum + d.value, 0);
                    const percentage = ((genderData[index].value / total) * 100).toFixed(1);
                    return `${value} (${percentage}%)`;
                  }} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Registration Category */}
            <div style={{ flex: 1, padding: '20px', background: '#effbfe', borderRadius: '12px' }}>
              <h2 style={{ textAlign: 'center', color: '#008037' }}>Registration Category</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={categoryData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend formatter={(value, entry, index) => {
                    const total = categoryData.reduce((sum, d) => sum + d.value, 0);
                    const percentage = ((categoryData[index].value / total) * 100).toFixed(1);
                    return `${value} (${percentage}%)`;
                  }} />
                  <Bar dataKey="value" fill="#00C49F">
                    {categoryData.map((entry, index) => (
                      <Cell key={`bar-cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

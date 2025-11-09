import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesTrend = () => {
  const [timeRange, setTimeRange] = useState('weekly');

  const weeklyData = [
    { date: 'Mon', current: 35000, previous: 28000 },
    { date: 'Tue', current: 42000, previous: 35000 },
    { date: 'Wed', current: 38000, previous: 32000 },
    { date: 'Thu', current: 48000, previous: 39000 },
    { date: 'Fri', current: 52000, previous: 45000 },
    { date: 'Sat', current: 58000, previous: 48000 },
    { date: 'Sun', current: 45000, previous: 38000 }
  ];

  const monthlyData = [
    { date: 'Jan', current: 245000, previous: 198000 },
    { date: 'Feb', current: 268000, previous: 215000 },
    { date: 'Mar', current: 289000, previous: 238000 },
    { date: 'Apr', current: 312000, previous: 265000 },
    { date: 'May', current: 295000, previous: 278000 },
    { date: 'Jun', current: 335000, previous: 292000 }
  ];

  const data = timeRange === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="lg:col-span-2 bg-card rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Sales Trend Analysis</h2>
          <p className="text-sm text-muted-foreground mt-1">Current vs Previous Period</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('weekly')}
            className={`px-3 py-1 text-xs rounded-lg font-medium ${
              timeRange === 'weekly'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeRange('monthly')}
            className={`px-3 py-1 text-xs rounded-lg font-medium ${
              timeRange === 'monthly'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))" 
            style={{ fontSize: '12px' }} 
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))" 
            style={{ fontSize: '12px' }} 
            tickFormatter={(value) => `₹${value / 1000}k`} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))', 
              borderRadius: '12px', 
              padding: '12px',
              color: 'hsl(var(--foreground))'
            }}
            formatter={(value) => `₹${value.toLocaleString()}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="current" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3} 
            name="Current Period" 
            dot={{ fill: 'hsl(var(--primary))', r: 5 }} 
          />
          <Line 
            type="monotone" 
            dataKey="previous" 
            stroke="hsl(var(--muted-foreground))" 
            strokeWidth={2} 
            strokeDasharray="5 5" 
            name="Previous Period" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesTrend;

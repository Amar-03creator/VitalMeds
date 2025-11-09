import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueVsCost = () => {
  const revenueVsCostData = [
    { month: 'Jan', revenue: 245000, cost: 180000 },
    { month: 'Feb', revenue: 268000, cost: 195000 },
    { month: 'Mar', revenue: 289000, cost: 210000 },
    { month: 'Apr', revenue: 312000, cost: 225000 },
    { month: 'May', revenue: 295000, cost: 218000 },
    { month: 'Jun', revenue: 335000, cost: 242000 }
  ];

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Revenue vs Cost</h2>
          <p className="text-sm text-muted-foreground mt-1">Gross Profit Analysis</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600 dark:text-green-500">32.8%</p>
          <p className="text-xs text-muted-foreground">Avg. Margin</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={revenueVsCostData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
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
              color: 'hsl(var(--foreground))'
            }}
            formatter={(value) => `₹${value.toLocaleString()}`}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stackId="1" 
            stroke="#10b981" 
            fill="#10b981" 
            fillOpacity={0.6} 
            name="Revenue" 
          />
          <Area 
            type="monotone" 
            dataKey="cost" 
            stackId="2" 
            stroke="#ef4444" 
            fill="#ef4444" 
            fillOpacity={0.6} 
            name="Cost" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueVsCost;

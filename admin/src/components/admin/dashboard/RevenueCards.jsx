import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

const RevenueCards = () => {
  const revenueSparkline = [45, 52, 48, 65, 58, 72, 68, 75, 82, 78, 88, 95];

  const Sparkline = ({ data, color = 'rgba(255, 255, 255, 0.8)' }) => (
    <svg width="100" height="30" className="inline-block">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={data.map((value, i) => 
          `${(i / (data.length - 1)) * 100},${30 - (value / Math.max(...data)) * 25}`
        ).join(' ')}
      />
    </svg>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 dark:from-purple-700 dark:via-purple-800 dark:to-purple-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium opacity-90">MTD Revenue</span>
            <BarChart3 size={20} />
          </div>
          <div className="text-4xl font-bold mb-2">₹18.5L</div>
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-90">Target: ₹25L (74%)</span>
            <div className="w-24 h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '74%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 dark:from-green-700 dark:via-green-800 dark:to-green-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium opacity-90">YTD Revenue</span>
            <TrendingUp size={20} />
          </div>
          <div className="text-4xl font-bold mb-2">₹2.84Cr</div>
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-90">+18.3% vs last year</span>
            <Sparkline data={revenueSparkline.map(v => v * 1.2)} color="rgba(255, 255, 255, 0.8)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueCards;

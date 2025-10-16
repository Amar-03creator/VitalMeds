// src/components/client/dashboard/MonthlySummary.jsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { IndianRupee } from 'lucide-react';

const MonthlySummary = () => {
  return (
    <Card className="text-white border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-950">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl">Monthly Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-blue-700 bg-opacity-50 dark:bg-blue-950 dark:bg-opacity-50 rounded-lg">
          <span className="text-sm font-medium text-white">Total Order Value</span>
          <span className="font-semibold text-xl flex items-center text-white">
            <IndianRupee className="w-4 h-4" />
            45,230
          </span>
        </div>
        <div className="flex items-center justify-between p-4 bg-blue-700 bg-opacity-50 dark:bg-blue-950 dark:bg-opacity-50 rounded-lg">
          <span className="text-sm font-medium text-white">Products Ordered</span>
          <span className="font-semibold text-xl text-white">124</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-blue-700 bg-opacity-50 dark:bg-blue-950 dark:bg-opacity-50 rounded-lg">
          <span className="text-sm font-medium text-white">Payable Amount</span>
          <span className="font-semibold text-xl text-yellow-300 flex items-center">
            <IndianRupee className="w-4 h-4" />
            12,450
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlySummary;

//quite fine
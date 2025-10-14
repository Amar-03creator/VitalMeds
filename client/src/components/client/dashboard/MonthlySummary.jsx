import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { IndianRupee } from 'lucide-react';
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { useTheme } from '@/contexts/useTheme'

const MonthlySummary = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <Card 
      className="text-white border-0 shadow-lg"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)'
          : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      }}
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl">Monthly Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg backdrop-blur">
          <span className="text-sm font-medium">Total Order Value</span>
          <span className="font-semibold text-xl flex items-center">
            <IndianRupee className="w-4 h-4" />
            45,230
          </span>
        </div>
        <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg backdrop-blur">
          <span className="text-sm font-medium">Products Ordered</span>
          <span className="font-semibold text-xl">124</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg backdrop-blur">
          <span className="text-sm font-medium">Payable Amount</span>
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

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeProvider';
import {
  RotateCcw,
  Plus,
  Truck,
  FileText,
  Receipt,
} from 'lucide-react';

const QuickActionBar = () => {
  const { theme } = useTheme();

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const actions = [
    {
      title: 'Quick Reorder',
      description: 'Last 10 Products',
      icon: RotateCcw,
      lightBg: '#eff6ff',
      darkBg: '#1e3a8a',
      lightHoverBg: '#dbeafe',
      darkHoverBg: '#1e40af',
      lightIconColor: '#2563eb',
      darkIconColor: '#60a5fa',
    },
    {
      title: 'New Order',
      description: 'Create fresh',
      icon: Plus,
      lightBg: '#f0fdf4',
      darkBg: '#064e3b',
      lightHoverBg: '#dcfce7',
      darkHoverBg: '#065f46',
      lightIconColor: '#16a34a',
      darkIconColor: '#4ade80',
    },
    {
      title: 'Track Order',
      description: 'Recent status',
      icon: Truck,
      lightBg: '#fff7ed',
      darkBg: '#7c2d12',
      lightHoverBg: '#ffedd5',
      darkHoverBg: '#9a3412',
      lightIconColor: '#ea580c',
      darkIconColor: '#fb923c',
    },
    {
      title: 'Upload Docs',
      description: 'Prescription',
      icon: FileText,
      lightBg: '#faf5ff',
      darkBg: '#581c87',
      lightHoverBg: '#f3e8ff',
      darkHoverBg: '#6b21a8',
      lightIconColor: '#9333ea',
      darkIconColor: '#c084fc',
    },
    {
      title: 'Get Quote',
      description: 'RFQ',
      icon: Receipt,
      lightBg: '#fef2f2',
      darkBg: '#7f1d1d',
      lightHoverBg: '#fee2e2',
      darkHoverBg: '#991b1b',
      lightIconColor: '#dc2626',
      darkIconColor: '#f87171',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;
        const [isHovered, setIsHovered] = React.useState(false);

        return (
          <Card
            key={index}
            className="cursor-pointer group transition-all hover:shadow-lg"
            style={{
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              borderColor: isDark ? '#374151' : '#e5e7eb',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardContent className="pt-2 text-center">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 transition-all"
                style={{
                  backgroundColor: isHovered
                    ? isDark
                      ? action.darkHoverBg
                      : action.lightHoverBg
                    : isDark
                    ? action.darkBg
                    : action.lightBg,
                }}
              >
                <Icon
                  className="w-6 h-6"
                  style={{
                    color: isDark ? action.darkIconColor : action.lightIconColor,
                  }}
                />
              </div>
              <p
                className="font-medium mb-1"
                style={{ color: isDark ? '#f9fafb' : '#111827' }}
              >
                {action.title}
              </p>
              <p
                className="text-sm"
                style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
              >
                {action.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickActionBar;
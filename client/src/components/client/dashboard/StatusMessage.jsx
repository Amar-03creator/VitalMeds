import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { useTheme } from '@/contexts/useTheme'

const StatusMessage = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  if (user?.status !== 'Pending Approval') {
    return null;
  }

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <Card
      className="border shadow-sm"
      style={{
        backgroundColor: isDark ? '#451a03' : '#fffbeb',
        borderColor: isDark ? '#78350f' : '#fde68a',
      }}
    >
      <CardContent className="p-6 pt-2">
        <div className="flex items-start space-x-4">
          <AlertCircle
            className="w-6 h-6 mt-1 flex-shrink-0"
            style={{ color: isDark ? '#fbbf24' : '#d97706' }}
          />
          <div className="space-y-2">
            <h3
              className="font-semibold text-lg"
              style={{ color: isDark ? '#fef3c7' : '#78350f' }}
            >
              Account Under Review
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: isDark ? '#fde68a' : '#92400e' }}
            >
              Your account is currently being reviewed by our admin team. You can
              browse products but cannot place orders until approval is complete.
            </p>
            <p
              className="text-sm"
              style={{ color: isDark ? '#fcd34d' : '#b45309' }}
            >
              Verification typically takes 24-48 hours. We'll notify you via email
              once approved.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusMessage;
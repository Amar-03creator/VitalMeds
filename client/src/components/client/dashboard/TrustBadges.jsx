import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeProvider';

const TrustBadges = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <Card
      className={`rounded-xl shadow-lg border transition-all duration-300 ${
        isDark
          ? 'border-green-900/50'
          : 'border-blue-200'
      }`}
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)'
          : 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)',
      }}
    >
      <CardContent className="p-4 pt-4 text-center flex flex-col items-center justify-center min-h-[280px]">
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isDark ? 'bg-green-600' : 'bg-blue-500'
          }`}
        >
          <CheckCircle className="w-8 h-8 text-white" />
        </div>

        {/* Title */}
        <h4
          className="text-lg font-bold mb-2"
          style={{ color: isDark ? '#ffffff' : '#1e3a8a' }}
        >
          Verified Distributor
        </h4>

        {/* GSTIN */}
        <p
          className="text-sm mb-1 font-medium"
          style={{ color: isDark ? '#d1fae5' : '#1e40af' }}
        >
          GSTIN: {user?.gstin || '29ABCDE1234F2Z5'}
        </p>

        {/* Drug License */}
        <p
          className="text-sm font-medium"
          style={{ color: isDark ? '#d1fae5' : '#1e40af' }}
        >
          Drug License: {user?.drugLicense || 'DL-123456'}
        </p>

        {/* Additional Trust Indicator */}
        <div className="mt-4 pt-4 border-t" style={{ borderColor: isDark ? '#065f46' : '#93c5fd' }}>
          <div className="flex items-center justify-center gap-2">
            <Shield
              className="w-4 h-4"
              style={{ color: isDark ? '#6ee7b7' : '#2563eb' }}
            />
            <span
              className="text-xs font-semibold"
              style={{ color: isDark ? '#a7f3d0' : '#1e40af' }}
            >
              20+ Years Industry Experience
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustBadges;
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building } from 'lucide-react';

const LoginCardHeader = ({ isDark }) => {
  return (
    <CardHeader className="text-center pb-2">
      <CardTitle className="text-3xl font-bold" style={{ color: isDark ? '#60a5fa' : '#2563eb' }}>
        Welcome Back
      </CardTitle>
      <CardDescription style={{ color: isDark ? '#cbd5e1' : '#64748b' }}>
        Sign in to your VitalMEDS business account
      </CardDescription>
      <Badge
        variant="outline"
        className="w-fit mx-auto mt-2"
        style={{
          backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
          borderColor: isDark ? '#3b82f6' : '#2563eb',
          color: isDark ? '#60a5fa' : '#2563eb'
        }}
      >
        <Building className="w-4 h-4 mr-1" />
        B2B Portal
      </Badge>
    </CardHeader>
  );
};

export default LoginCardHeader;

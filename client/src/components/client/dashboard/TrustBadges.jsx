import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const TrustBadges = () => {
  const { user } = useAuth();

  return (
    <Card className="rounded-xl shadow-lg border border-blue-200 dark:border-green-900 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-green-950 dark:via-green-900 dark:to-green-800">
      <CardContent className="p-4 pt-4 text-center flex flex-col items-center justify-center min-h-[280px]">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-500 dark:bg-green-600">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>

        {/* Title */}
        <h4 className="text-lg font-bold mb-2 text-blue-900 dark:text-white">
          Verified Distributor
        </h4>

        {/* GSTIN */}
        <p className="text-sm mb-1 font-medium text-blue-800 dark:text-green-100">
          GSTIN: {user?.gstin || '29ABCDE1234F2Z5'}
        </p>

        {/* Drug License */}
        <p className="text-sm font-medium text-blue-800 dark:text-green-100">
          Drug License: {user?.drugLicense || 'DL-123456'}
        </p>

        {/* Additional Trust Indicator */}
        <div className="mt-4 pt-4 border-t border-blue-300 dark:border-green-700">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-blue-600 dark:text-green-300" />
            <span className="text-xs font-semibold text-blue-800 dark:text-green-200">
              20+ Years Industry Experience
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustBadges;

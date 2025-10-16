// src/components/client/dashboard/StatusAlert.jsx
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Clock } from 'lucide-react';

const StatusAlert = ({ status }) => {
  // Check for both 'Pending' and 'Pending Approval'
  if (status !== 'pending' && status !== 'Pending' && status !== 'Pending Approval') {
    return null;
  }

  return (
    <Alert className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200">
      <Clock className="h-5 w-5 text-amber-600 dark:text-amber-500" />
      <AlertTitle className="font-semibold text-base mb-2">
        Account Under Review
      </AlertTitle>
      <AlertDescription className="space-y-2">
        <p className="text-sm leading-relaxed">
          Your account is currently being reviewed by our admin team. You can browse products but cannot place orders until approval is complete.
        </p>
        <p className="text-sm leading-relaxed opacity-90">
          Verification typically takes 24-48 hours. We'll notify you via email once approved.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default StatusAlert;
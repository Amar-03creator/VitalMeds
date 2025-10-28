import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const StatusAlert = ({ userStatus, isDrawerOpen }) => {
  if (userStatus === 'Approved') return null;

  return (
    <Alert className={`mb-4 bg-yellow-50 dark:bg-yellow-900/10 border-yellow-400 dark:border-yellow-600 text-yellow-900 dark:text-yellow-400 transition-all duration-300 ${
      isDrawerOpen ? 'lg:w-[calc(100%-350px)]' : ''
    }`}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Your account is pending approval. You can browse products but cannot place orders until verified.
      </AlertDescription>
    </Alert>
  );
};

export default StatusAlert;

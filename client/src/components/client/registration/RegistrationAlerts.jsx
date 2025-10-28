import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle } from 'lucide-react';

const RegistrationAlerts = ({ successMessage, errorMessage, isDark }) => {
  return (
    <>
      {successMessage && (
        <Alert
          className="mb-6"
          style={{
            backgroundColor: isDark ? 'rgba(34, 197, 94, 0.1)' : '#f0fdf4',
            borderColor: isDark ? '#22c55e' : '#bbf7d0',
            color: isDark ? '#4ade80' : '#15803d'
          }}
        >
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert
          variant="destructive"
          className="mb-6"
          style={{
            backgroundColor: isDark ? 'rgba(220, 38, 38, 0.1)' : '#fee2e2',
            borderColor: isDark ? '#dc2626' : '#fca5a5',
            color: isDark ? '#fca5a5' : '#991b1b'
          }}
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default RegistrationAlerts;

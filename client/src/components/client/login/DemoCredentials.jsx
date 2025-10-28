import React from 'react';

const DemoCredentials = ({ isDark }) => {
  return (
    <div
      className="mt-6 p-4 rounded-lg"
      style={{
        backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(241, 245, 249, 0.8)'
      }}
    >
      <p className="text-sm font-medium mb-2" style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>
        Demo Credentials:
      </p>
      <p className="text-xs" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
        Email: client@pharmacy.com
        <br />
        Password: client123
      </p>
    </div>
  );
};

export default DemoCredentials;

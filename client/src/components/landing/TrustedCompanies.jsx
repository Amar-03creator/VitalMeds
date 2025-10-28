import React from 'react';
import { Building, HeartHandshake, Shield, Award } from 'lucide-react';

const TrustedCompanies = ({ isDark }) => {
  const companies = [
    { name: 'Company A', icon: Building, color: 'blue' },
    { name: 'Company B', icon: HeartHandshake, color: 'green' },
    { name: 'Company C', icon: Shield, color: 'purple' },
    { name: 'Company D', icon: Award, color: 'orange' }
  ];

  const iconBg = {
    blue: isDark ? '#1e3a8a' : '#dbeafe',
    green: isDark ? '#14532d' : '#dcfce7',
    purple: isDark ? '#581c87' : '#f3e8ff',
    orange: isDark ? '#7c2d12' : '#ffedd5'
  };

  const iconColor = {
    blue: isDark ? '#60a5fa' : '#2563eb',
    green: isDark ? '#4ade80' : '#16a34a',
    purple: isDark ? '#a78bfa' : '#9333ea',
    orange: isDark ? '#fb923c' : '#ea580c'
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-20 backdrop-blur-sm rounded-3xl my-12"
      style={{
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.6)'
      }}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
          Trusted Pharmaceutical Companies
        </h2>
        <p className="text-lg" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
          We partner with 3-4 premium pharmaceutical companies to ensure quality and authenticity
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {companies.map((company, idx) => {
          const Icon = company.icon;
          return (
            <div
              key={idx}
              className="flex items-center justify-center p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all"
              style={{
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: isDark ? '#334155' : '#e2e8f0'
              }}
            >
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{
                    backgroundColor: iconBg[company.color]
                  }}
                >
                  <Icon className="w-8 h-8" style={{ color: iconColor[company.color] }} />
                </div>
                <p className="font-semibold" style={{ color: isDark ? '#cbd5e1' : '#334155' }}>
                  {company.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrustedCompanies;

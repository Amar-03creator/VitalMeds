import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, Users, ArrowRight } from 'lucide-react';

const HeroSection = ({ isDark, theme }) => {
  const stats = [
    { value: '25+', label: 'Years Experience' },
    { value: '100+', label: 'Products' },
    { value: '3-4', label: 'Trusted Companies' },
    { value: '48h', label: 'Avg Delivery' }
  ];

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(147, 197, 253, 0.3), transparent 70%)'
        }}
      />
      <div className="max-w-7xl mx-auto px-4 py-20 sm:py-28 relative">
        <div className="text-center">
          <Badge
            variant="outline"
            className="mb-6 px-4 py-2 backdrop-blur-sm"
            style={{
              backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.9)',
              borderColor: isDark ? '#475569' : '#cbd5e1',
              color: isDark ? '#e2e8f0' : '#334155'
            }}
          >
            <Building className="w-4 h-4 mr-2" />
            B2B Pharmaceutical Platform
          </Badge>

          <h1
            className="text-5xl font-bold tracking-tight sm:text-7xl mb-6"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            Welcome to{' '}
            <span
              key={theme}
              style={{
                background: isDark
                  ? 'linear-gradient(to right, #60a5fa, #3b82f6)'
                  : 'linear-gradient(to right, #2563eb, #1d4ed8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
                transition: 'none'
              }}
            >
              VitalMEDS
            </span>
          </h1>

          <p
            className="text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
            style={{ color: isDark ? '#cbd5e1' : '#475569' }}
          >
            Your premier destination for authentic pharmaceutical products. Direct access to quality
            medicines from a trusted, verified distributor with complete transparency and reliability.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button
                size="lg"
                className="px-10 py-6 text-lg shadow-xl text-white"
                style={{
                  background: isDark
                    ? 'linear-gradient(to right, #3b82f6, #2563eb)'
                    : 'linear-gradient(to right, #2563eb, #1d4ed8)'
                }}
              >
                <Users className="w-5 h-5 mr-2" />
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Link to="/login">
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-6 text-lg"
                style={{
                  backgroundColor: isDark ? 'transparent' : '#ffffff',
                  color: isDark ? '#e2e8f0' : '#334155',
                  borderColor: isDark ? '#475569' : '#cbd5e1'
                }}
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="backdrop-blur-sm rounded-2xl p-6 shadow-sm"
                style={{
                  backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: isDark ? '#334155' : '#e2e8f0'
                }}
              >
                <div className="text-3xl font-bold mb-1" style={{ color: isDark ? '#60a5fa' : '#2563eb' }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

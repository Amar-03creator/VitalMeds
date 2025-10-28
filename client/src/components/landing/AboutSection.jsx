import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, UserCheck, Shield, Star } from 'lucide-react';

const AboutSection = ({ isDark }) => {
  const features = [
    {
      icon: UserCheck,
      title: 'Industry Expertise',
      description: 'Deep understanding of pharmaceutical operations from 25+ years of industry experience',
      gradient: isDark
        ? 'linear-gradient(135deg, #1e3a8a, #1e40af)'
        : 'linear-gradient(135deg, #3b82f6, #2563eb)'
    },
    {
      icon: Shield,
      title: 'Trusted Network',
      description: 'Built on decades of trust and authentic relationships with healthcare professionals',
      gradient: isDark
        ? 'linear-gradient(135deg, #14532d, #15803d)'
        : 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      icon: Star,
      title: 'Quality Commitment',
      description: 'Unwavering dedication to authentic medicines and transparent business practices',
      gradient: isDark
        ? 'linear-gradient(135deg, #581c87, #6b21a8)'
        : 'linear-gradient(135deg, #a855f7, #9333ea)'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Badge
            variant="outline"
            className="mb-4"
            style={{
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              borderColor: isDark ? '#475569' : '#cbd5e1',
              color: isDark ? '#e2e8f0' : '#334155'
            }}
          >
            <Clock className="w-4 h-4 mr-2" />
            Our Story
          </Badge>
          <h2 className="text-4xl font-bold mb-6" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
            About VitalMEDS
          </h2>
          <div className="space-y-5 text-lg leading-relaxed" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
            <p>
              With over <strong style={{ color: isDark ? '#ffffff' : '#0f172a' }}>25 years of experience</strong> in
              the pharmaceutical industry, our journey began with deep involvement in healthcare operations, building
              meaningful relationships with healthcare professionals and developing a comprehensive understanding of the
              critical needs of the medical community.
            </p>
            <p>
              In <strong style={{ color: isDark ? '#ffffff' : '#0f172a' }}>2021</strong>, leveraging decades of
              industry expertise and trusted relationships, we founded VitalMEDS to bridge the gap between pharmaceutical
              manufacturers and healthcare establishments through a reliable, transparent distribution network.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6">
            <div
              className="text-center p-6 rounded-2xl shadow-sm"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(30, 58, 138, 0.3), rgba(30, 64, 175, 0.3))'
                  : 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: isDark ? '#1e3a8a' : '#bfdbfe'
              }}
            >
              <div className="text-4xl font-bold mb-2" style={{ color: isDark ? '#60a5fa' : '#2563eb' }}>
                25+
              </div>
              <div className="text-sm" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                Years Experience
              </div>
            </div>
            <div
              className="text-center p-6 rounded-2xl shadow-sm"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(20, 83, 45, 0.3), rgba(22, 101, 52, 0.3))'
                  : 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: isDark ? '#14532d' : '#bbf7d0'
              }}
            >
              <div className="text-4xl font-bold mb-2" style={{ color: isDark ? '#4ade80' : '#16a34a' }}>
                2021
              </div>
              <div className="text-sm" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                Company Founded
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className="p-6 shadow-lg hover:shadow-xl transition-all"
                style={{
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  borderColor: isDark ? '#334155' : '#e2e8f0'
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl text-white" style={{ background: item.gradient }}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: isDark ? '#cbd5e1' : '#475569' }}>{item.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

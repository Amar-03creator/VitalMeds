import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Award, Truck, FileCheck } from 'lucide-react';

const FeaturesSection = ({ isDark }) => {
  const features = [
    {
      icon: Award,
      title: 'Trusted Distributor',
      description:
        'Direct partnership with a single, verified pharmaceutical distributor ensuring authentic products and consistent quality standards.',
      gradient: isDark
        ? 'linear-gradient(to right, #1e3a8a, #1e40af)'
        : 'linear-gradient(to right, #3b82f6, #2563eb)',
      barGradient: isDark
        ? 'linear-gradient(to right, #3b82f6, #2563eb)'
        : 'linear-gradient(to right, #3b82f6, #2563eb)'
    },
    {
      icon: Truck,
      title: 'Reliable Supply Chain',
      description:
        'Streamlined ordering process with direct inventory access and dependable delivery schedules for your pharmaceutical needs.',
      gradient: isDark
        ? 'linear-gradient(to right, #14532d, #15803d)'
        : 'linear-gradient(to right, #10b981, #059669)',
      barGradient: isDark
        ? 'linear-gradient(to right, #10b981, #059669)'
        : 'linear-gradient(to right, #10b981, #059669)'
    },
    {
      icon: FileCheck,
      title: 'Complete Transparency',
      description:
        "Full verification system where both parties can verify each other's GSTIN, Drug License, and other credentials for secure transactions.",
      gradient: isDark
        ? 'linear-gradient(to right, #581c87, #6b21a8)'
        : 'linear-gradient(to right, #a855f7, #9333ea)',
      barGradient: isDark
        ? 'linear-gradient(to right, #a855f7, #9333ea)'
        : 'linear-gradient(to right, #a855f7, #9333ea)'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
          Why Choose VitalMEDS?
        </h2>
        <p className="text-xl max-w-3xl mx-auto" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
          Built specifically for pharmaceutical businesses with features that matter most to your operations.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <Card
              key={idx}
              className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              style={{
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderColor: isDark ? '#334155' : '#e2e8f0'
              }}
            >
              <div className="h-2" style={{ background: feature.barGradient }} />
              <CardHeader className="pt-8">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-white"
                  style={{ background: feature.gradient }}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <CardTitle className="text-xl" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturesSection;

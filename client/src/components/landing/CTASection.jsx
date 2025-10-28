import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Users, ArrowRight, CheckCircle } from 'lucide-react';

const CTASection = ({ isDark }) => {
  const benefits = [
    'Access to 3-4 premium pharmaceutical companies',
    'Submit inquiries and get instant quotes',
    'Track your order history and delivery status',
    'Verification via GSTIN + Drug License OR Aadhaar + PAN',
    "View distributor's credentials for transparency"
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Card
        className="hover:shadow-2xl transition-all duration-300 overflow-hidden"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #1e293b, #0f172a)'
            : 'linear-gradient(135deg, #ffffff, #eff6ff)',
          borderColor: isDark ? '#334155' : '#e2e8f0'
        }}
      >
        <div style={{ height: '2px', background: 'linear-gradient(to right, #10b981, #059669)' }} />
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
              Client Portal
            </CardTitle>
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
            >
              <ShoppingCart className="w-8 h-8" />
            </div>
          </div>
          <CardDescription className="text-lg" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
            Browse our extensive medicine catalog, submit inquiries, and manage your orders.
          </CardDescription>
        </CardHeader>

        <div className="px-6 pb-6">
          <div className="space-y-3 mb-8">
            {benefits.map((item, idx) => (
              <div key={idx} className="flex items-center" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                  style={{
                    backgroundColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#d1fae5'
                  }}
                >
                  <CheckCircle className="w-4 h-4" style={{ color: isDark ? '#4ade80' : '#16a34a' }} />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>

        <CardFooter className="pt-0 pb-6">
          <Link to="/register" className="w-full">
            <Button
              className="w-full h-14 text-lg text-white shadow-lg"
              style={{
                background: isDark
                  ? 'linear-gradient(to right, #10b981, #059669)'
                  : 'linear-gradient(to right, #16a34a, #15803d)'
              }}
            >
              <Users className="w-5 h-5 mr-2" />
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CTASection;

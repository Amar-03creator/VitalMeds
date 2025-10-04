import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeProvider';
import {
  Building,
  ShoppingCart,
  Users,
  Shield,
  Truck,
  HeartHandshake,
  ArrowRight,
  CheckCircle,
  Award,
  FileCheck,
  Star,
  Clock,
  UserCheck,
  Phone,
  Mail,
  MapPin,
  Moon,
  Sun
} from 'lucide-react';

const LandingPage = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div style={{ backgroundColor: isDark ? '#020617' : '#f8fafc', minHeight: '100vh' }}>
      {/* Header Navigation */}
      <header
        className="backdrop-blur-lg sticky top-0 z-50 border-b"
        style={{
          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderColor: isDark ? '#334155' : '#e2e8f0'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                  : 'linear-gradient(135deg, #2563eb, #1d4ed8)'
              }}
            >
              <Building className="w-6 h-6 text-white" />
            </div>
            <h1
              key={theme}
              className="text-2xl font-bold"
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
            </h1>

          </div>
          <div className="flex gap-3 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-lg transition-colors"
              style={{
                backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
                color: isDark ? '#e2e8f0' : '#1e293b'
              }}
            >
              {isDark ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5 text-amber-500" />
              )}
            </Button>
            <Link to="/login">
              <Button
                variant="outline"
                style={{
                  backgroundColor: isDark ? 'transparent' : '#ffffff',
                  color: isDark ? '#e2e8f0' : '#334155',
                  borderColor: isDark ? '#475569' : '#cbd5e1'
                }}
              >
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button
                className="shadow-lg text-white"
                style={{
                  background: isDark
                    ? 'linear-gradient(to right, #3b82f6, #2563eb)'
                    : 'linear-gradient(to right, #2563eb, #1d4ed8)'
                }}
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 70%)'
              : 'radial-gradient(circle at 50% 50%, rgba(147, 197, 253, 0.3), transparent 70%)'
          }}
        ></div>
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
                key={theme} // Force re-render on theme change
                style={{
                  background: isDark
                    ? 'linear-gradient(to right, #60a5fa, #3b82f6)'
                    : 'linear-gradient(to right, #2563eb, #1d4ed8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                  transition: 'none' // Disable CSS transition for this element
                }}
              >
                VitalMEDS
              </span>
            </h1>



            <p
              className="text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
              style={{ color: isDark ? '#cbd5e1' : '#475569' }}
            >
              Your premier destination for authentic pharmaceutical products. Direct access to
              quality medicines from a trusted, verified distributor with complete transparency and reliability.
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
              {[
                { value: '25+', label: 'Years Experience' },
                { value: '100+', label: 'Products' },
                { value: '3-4', label: 'Trusted Companies' },
                { value: '48h', label: 'Avg Delivery' }
              ].map((stat, idx) => (
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
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: isDark ? '#60a5fa' : '#2563eb' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Companies Section */}
      <div
        className="max-w-7xl mx-auto px-4 py-20 backdrop-blur-sm rounded-3xl my-12"
        style={{
          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.6)'
        }}
      >
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            Trusted Pharmaceutical Companies
          </h2>
          <p
            className="text-lg"
            style={{ color: isDark ? '#cbd5e1' : '#475569' }}
          >
            We partner with 3-4 premium pharmaceutical companies to ensure quality and authenticity
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Company A', icon: Building, color: 'blue' },
            { name: 'Company B', icon: HeartHandshake, color: 'green' },
            { name: 'Company C', icon: Shield, color: 'purple' },
            { name: 'Company D', icon: Award, color: 'orange' }
          ].map((company, idx) => {
            const Icon = company.icon;
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
                  <p
                    className="font-semibold"
                    style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                  >
                    {company.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* About Us Section */}
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
            <h2
              className="text-4xl font-bold mb-6"
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            >
              About VitalMEDS
            </h2>
            <div
              className="space-y-5 text-lg leading-relaxed"
              style={{ color: isDark ? '#cbd5e1' : '#475569' }}
            >
              <p>
                With over <strong style={{ color: isDark ? '#ffffff' : '#0f172a' }}>25 years of experience</strong> in the pharmaceutical industry,
                our journey began with deep involvement in healthcare operations, building meaningful relationships with
                healthcare professionals and developing a comprehensive understanding of the critical needs of the medical community.
              </p>
              <p>
                In <strong style={{ color: isDark ? '#ffffff' : '#0f172a' }}>2021</strong>, leveraging decades of industry expertise and trusted
                relationships, we founded VitalMEDS to bridge the gap between pharmaceutical manufacturers
                and healthcare establishments through a reliable, transparent distribution network.
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
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: isDark ? '#60a5fa' : '#2563eb' }}
                >
                  25+
                </div>
                <div
                  className="text-sm"
                  style={{ color: isDark ? '#94a3b8' : '#475569' }}
                >
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
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: isDark ? '#4ade80' : '#16a34a' }}
                >
                  2021
                </div>
                <div
                  className="text-sm"
                  style={{ color: isDark ? '#94a3b8' : '#475569' }}
                >
                  Company Founded
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: UserCheck,
                title: 'Industry Expertise',
                description: 'Deep understanding of pharmaceutical operations from 25+ years of industry experience',
                gradient: isDark ? 'linear-gradient(135deg, #1e3a8a, #1e40af)' : 'linear-gradient(135deg, #3b82f6, #2563eb)'
              },
              {
                icon: Shield,
                title: 'Trusted Network',
                description: 'Built on decades of trust and authentic relationships with healthcare professionals',
                gradient: isDark ? 'linear-gradient(135deg, #14532d, #15803d)' : 'linear-gradient(135deg, #10b981, #059669)'
              },
              {
                icon: Star,
                title: 'Quality Commitment',
                description: 'Unwavering dedication to authentic medicines and transparent business practices',
                gradient: isDark ? 'linear-gradient(135deg, #581c87, #6b21a8)' : 'linear-gradient(135deg, #a855f7, #9333ea)'
              }
            ].map((item, idx) => {
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
                    <div
                      className="p-3 rounded-xl text-white"
                      style={{ background: item.gradient }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-lg mb-2"
                        style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                      >
                        {item.title}
                      </h3>
                      <p style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            Why Choose VitalMEDS?
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: isDark ? '#cbd5e1' : '#475569' }}
          >
            Built specifically for pharmaceutical businesses with features that matter most to your operations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Award,
              title: 'Trusted Distributor',
              description: 'Direct partnership with a single, verified pharmaceutical distributor ensuring authentic products and consistent quality standards.',
              gradient: isDark ? 'linear-gradient(to right, #1e3a8a, #1e40af)' : 'linear-gradient(to right, #3b82f6, #2563eb)',
              barGradient: isDark ? 'linear-gradient(to right, #3b82f6, #2563eb)' : 'linear-gradient(to right, #3b82f6, #2563eb)'
            },
            {
              icon: Truck,
              title: 'Reliable Supply Chain',
              description: 'Streamlined ordering process with direct inventory access and dependable delivery schedules for your pharmaceutical needs.',
              gradient: isDark ? 'linear-gradient(to right, #14532d, #15803d)' : 'linear-gradient(to right, #10b981, #059669)',
              barGradient: isDark ? 'linear-gradient(to right, #10b981, #059669)' : 'linear-gradient(to right, #10b981, #059669)'
            },
            {
              icon: FileCheck,
              title: 'Complete Transparency',
              description: 'Full verification system where both parties can verify each other\'s GSTIN, Drug License, and other credentials for secure transactions.',
              gradient: isDark ? 'linear-gradient(to right, #581c87, #6b21a8)' : 'linear-gradient(to right, #a855f7, #9333ea)',
              barGradient: isDark ? 'linear-gradient(to right, #a855f7, #9333ea)' : 'linear-gradient(to right, #a855f7, #9333ea)'
            }
          ].map((feature, idx) => {
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
                <div
                  className="h-2"
                  style={{ background: feature.barGradient }}
                ></div>
                <CardHeader className="pt-8">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-white"
                    style={{ background: feature.gradient }}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <CardTitle
                    className="text-xl"
                    style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                  >
                    {feature.title}
                  </CardTitle>
                  <CardDescription
                    className="text-base leading-relaxed"
                    style={{ color: isDark ? '#cbd5e1' : '#475569' }}
                  >
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* CTA Card */}
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
            <div style={{ height: '2px', background: 'linear-gradient(to right, #10b981, #059669)' }}></div>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle
                  className="text-3xl"
                  style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                >
                  Client Portal
                </CardTitle>
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                >
                  <ShoppingCart className="w-8 h-8" />
                </div>
              </div>
              <CardDescription
                className="text-lg"
                style={{ color: isDark ? '#cbd5e1' : '#475569' }}
              >
                Browse our extensive medicine catalog, submit inquiries, and manage your orders.
              </CardDescription>
            </CardHeader>

            <div className="px-6 pb-6">
              <div className="space-y-3 mb-8">
                {[
                  'Access to 3-4 premium pharmaceutical companies',
                  'Submit inquiries and get instant quotes',
                  'Track your order history and delivery status',
                  'Verification via GSTIN + Drug License OR Aadhaar + PAN',
                  'View distributor\'s credentials for transparency'
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center"
                    style={{ color: isDark ? '#cbd5e1' : '#475569' }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                      style={{
                        backgroundColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#d1fae5'
                      }}
                    >
                      <CheckCircle
                        className="w-4 h-4"
                        style={{ color: isDark ? '#4ade80' : '#16a34a' }}
                      />
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
      </div>

      {/* Footer */}
      <footer
        className="w-full border-t mt-16"
        style={{
          backgroundColor: isDark ? '#0f172a' : '#1e293b',
          borderColor: isDark ? '#1e293b' : '#334155'
        }}
      >
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">VitalMEDS</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Trusted distributor for pharmacies & clinics. 20+ years industry
                experience delivering quality medicines across India.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>orders@vitalmeds.example</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Jaipur, Rajasthan, India</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Compliance
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p className="flex items-start">
                  <span className="font-medium text-gray-200 mr-2">GSTIN:</span>
                  <span>29ABCDE1234F2Z5</span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium text-gray-200 mr-2">Drug License:</span>
                  <span>DL-123456</span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium text-gray-200 mr-2">FSSAI:</span>
                  <span>12345678901234</span>
                </p>
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <p className="text-xs text-gray-400">
                    © 2025 VitalMEDS. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

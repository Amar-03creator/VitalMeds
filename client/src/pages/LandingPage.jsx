import React from 'react';
import { useTheme } from '@/contexts/useTheme';

// Landing Components
import LandingHeader from '@/components/landing/LandingHeader';
import HeroSection from '@/components/landing/HeroSection';
import TrustedCompanies from '@/components/landing/TrustedCompanies';
import AboutSection from '@/components/landing/AboutSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import CTASection from '@/components/landing/CTASection';
import LandingFooter from '@/components/landing/LandingFooter';

const LandingPage = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDark =
    theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div style={{ backgroundColor: isDark ? '#020617' : '#f8fafc', minHeight: '100vh' }}>
      <LandingHeader theme={theme} isDark={isDark} onToggleTheme={toggleTheme} />
      <HeroSection isDark={isDark} theme={theme} />
      <TrustedCompanies isDark={isDark} />
      <AboutSection isDark={isDark} />
      <FeaturesSection isDark={isDark} />
      <div className="max-w-7xl mx-auto px-4 py-20">
        <CTASection isDark={isDark} />
      </div>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;

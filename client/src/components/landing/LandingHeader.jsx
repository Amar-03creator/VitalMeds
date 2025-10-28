import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building, Moon, Sun } from 'lucide-react';

const LandingHeader = ({ theme, isDark, onToggleTheme }) => {
  return (
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
            onClick={onToggleTheme}
            className="rounded-lg transition-colors"
            style={{
              backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
              color: isDark ? '#e2e8f0' : '#1e293b'
            }}
          >
            {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-amber-500" />}
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
  );
};

export default LandingHeader;

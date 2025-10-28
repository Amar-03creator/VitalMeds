import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Moon, Sun } from 'lucide-react';

const RegisterHeader = ({ theme, onToggleTheme, isDark }) => {
  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
      <Link to="/">
        <Button variant="ghost" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleTheme}
        style={{
          backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
          color: isDark ? '#e2e8f0' : '#1e293b'
        }}
        className="rounded-lg transition-colors"
      >
        {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-amber-500" />}
      </Button>
    </div>
  );
};

export default RegisterHeader;

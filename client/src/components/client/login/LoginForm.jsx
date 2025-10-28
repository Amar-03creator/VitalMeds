import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

const LoginForm = ({
  formData,
  showPassword,
  isLoading,
  isDark,
  onInputChange,
  onTogglePassword,
  onSubmit
}) => {
  const inputStyle = {
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    borderColor: isDark ? '#475569' : '#cbd5e1',
    color: isDark ? '#f1f5f9' : '#0f172a'
  };

  const iconStyle = { color: isDark ? '#64748b' : '#94a3b8' };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={iconStyle} />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={onInputChange}
            className="pl-10"
            disabled={isLoading}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>
            Password
          </Label>
          <Button
            variant="link"
            className="h-auto p-0 text-sm"
            style={{ color: isDark ? '#94a3b8' : '#64748b' }}
          >
            Forgot password?
          </Button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={iconStyle} />
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={onInputChange}
            className="pl-10 pr-10"
            disabled={isLoading}
            style={inputStyle}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={onTogglePassword}
            disabled={isLoading}
            style={iconStyle}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 text-lg font-semibold text-white"
        disabled={isLoading}
        style={{
          background: isDark
            ? 'linear-gradient(to right, #3b82f6, #2563eb)'
            : 'linear-gradient(to right, #2563eb, #1d4ed8)'
        }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Signing In...
          </>
        ) : (
          <>
            <Mail className="w-5 h-5 mr-2" />
            Sign In
          </>
        )}
      </Button>
    </form>
  );
};

export default LoginForm;

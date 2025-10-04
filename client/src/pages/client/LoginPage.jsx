import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeProvider';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Building,
  ArrowLeft,
  Moon,
  Sun
} from 'lucide-react';


const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (error) {
      setError('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email.trim() || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting login with:', formData.email);

      const result = await login(formData.email, formData.password);

      console.log('Login result:', result);

      if (result.success) {
        console.log('Login successful, redirecting to dashboard...');
        navigate('/dashboard');
      } else {
        console.log('Login failed:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0a0a0a 0%, #000000 50%, #0a0a0a 100%)'
          : 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f0f9ff 100%)'
      }}
    >
      {/* Header with Back button and Theme Toggle */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <Link to="/">
          <Button
            variant="ghost"
            style={{
              color: isDark ? '#cbd5e1' : '#475569'
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          style={{
            backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
            color: isDark ? '#e2e8f0' : '#1e293b'
          }}
          className="rounded-lg transition-colors"
        >
          {theme === 'dark' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5 text-amber-500" />
          )}
        </Button>
      </div>


      <div className="w-full max-w-md">
        <Card
          className="shadow-xl"
          style={{
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0'
          }}
        >
          <CardHeader className="text-center pb-2">
            <CardTitle
              className="text-3xl font-bold"
              style={{ color: isDark ? '#60a5fa' : '#2563eb' }}
            >
              Welcome Back
            </CardTitle>
            <CardDescription style={{ color: isDark ? '#cbd5e1' : '#64748b' }}>
              Sign in to your VitalMEDS business account
            </CardDescription>
            <Badge
              variant="outline"
              className="w-fit mx-auto mt-2"
              style={{
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                borderColor: isDark ? '#3b82f6' : '#2563eb',
                color: isDark ? '#60a5fa' : '#2563eb'
              }}
            >
              <Building className="w-4 h-4 mr-1" />
              B2B Portal
            </Badge>
          </CardHeader>

          <CardContent>
            {/* Error Message */}
            {error && (
              <Alert
                variant="destructive"
                className="mb-6"
                style={{
                  backgroundColor: isDark ? 'rgba(220, 38, 38, 0.1)' : '#fee2e2',
                  borderColor: isDark ? '#dc2626' : '#fca5a5',
                  color: isDark ? '#fca5a5' : '#991b1b'
                }}
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                    style={{ color: isDark ? '#64748b' : '#94a3b8' }}
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    disabled={isLoading}
                    style={{
                      backgroundColor: isDark ? '#0f172a' : '#ffffff',
                      borderColor: isDark ? '#475569' : '#cbd5e1',
                      color: isDark ? '#f1f5f9' : '#0f172a'
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}
                  >
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
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                    style={{ color: isDark ? '#64748b' : '#94a3b8' }}
                  />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    disabled={isLoading}
                    style={{
                      backgroundColor: isDark ? '#0f172a' : '#ffffff',
                      borderColor: isDark ? '#475569' : '#cbd5e1',
                      color: isDark ? '#f1f5f9' : '#0f172a'
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    style={{ color: isDark ? '#64748b' : '#94a3b8' }}
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

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className="w-full border-t"
                    style={{ borderColor: isDark ? '#334155' : '#e2e8f0' }}
                  />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span
                    className="px-2"
                    style={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      color: isDark ? '#94a3b8' : '#64748b'
                    }}
                  >
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Sign In Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={isLoading}
                style={{
                  backgroundColor: isDark ? 'transparent' : '#ffffff',
                  borderColor: isDark ? '#475569' : '#cbd5e1',
                  color: isDark ? '#f1f5f9' : '#0f172a'
                }}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
              </Button>
            </form>

            {/* Demo Credentials */}
            <div
              className="mt-6 p-4 rounded-lg"
              style={{
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(241, 245, 249, 0.8)'
              }}
            >
              <p
                className="text-sm font-medium mb-2"
                style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}
              >
                Demo Credentials:
              </p>
              <p
                className="text-xs"
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
              >
                Email: client@pharmacy.com<br />
                Password: client123
              </p>
            </div>
          </CardContent>

          <CardFooter className="justify-center">
            <p
              className="text-sm"
              style={{ color: isDark ? '#94a3b8' : '#64748b' }}
            >
              Don't have an account?{' '}
              <Link to="/register">
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  style={{ color: isDark ? '#60a5fa' : '#2563eb' }}
                >
                  Create business account
                </Button>
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;

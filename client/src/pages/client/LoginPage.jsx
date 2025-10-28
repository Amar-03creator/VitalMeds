import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/useTheme';
import { AlertCircle } from 'lucide-react';

// Login Components
import LoginHeader from '@/components/client/login/LoginHeader';
import LoginCardHeader from '@/components/client/login/LoginCardHeader';
import LoginForm from '@/components/client/login/LoginForm';
import SocialLogin from '@/components/client/login/SocialLogin';
import DemoCredentials from '@/components/client/login/DemoCredentials';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isDark =
    theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
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
      const result = await login(formData.email, formData.password);

      if (result.success) {
        navigate('/dashboard');
      } else {
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
      <LoginHeader theme={theme} isDark={isDark} onToggleTheme={toggleTheme} />

      <div className="w-full max-w-md">
        <Card
          className="shadow-xl"
          style={{
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0'
          }}
        >
          <LoginCardHeader isDark={isDark} />

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
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <LoginForm
              formData={formData}
              showPassword={showPassword}
              isLoading={isLoading}
              isDark={isDark}
              onInputChange={handleInputChange}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onSubmit={handleSubmit}
            />

            <SocialLogin isDark={isDark} isLoading={isLoading} />

            <DemoCredentials isDark={isDark} />
          </CardContent>

          <CardFooter className="justify-center">
            <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
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

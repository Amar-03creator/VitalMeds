import React, { useState } from 'react';
import { Loader2, Eye, EyeOff, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/services/api';
import AdminMfaPage from './AdminMfaPage';

const AdminLoginPage = ({ onLoginSuccess }) => {
  const [stage, setStage] = useState('login'); // 'login' or 'mfa'
  const [mfaSessionId, setMfaSessionId] = useState(null);
  const [mfaMethods, setMfaMethods] = useState(null);
  
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send login request to backend (ADMIN AUTH)
      const response = await api.post('/admin/auth/login', {
        emailOrPhone,
        password
      });

      if (response.data?.mfaSessionId) {
        // Move to MFA stage
        setMfaSessionId(response.data.mfaSessionId);
        setMfaMethods(response.data.mfaMethods);
        setStage('mfa');
        console.log('✅ Factor 1 passed! Now enter MFA code.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle successful MFA verification
  const handleMfaSuccess = (token) => {
    localStorage.setItem('authToken', token);
    console.log('✅ Login successful! Token stored.');
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  // If MFA stage, show MFA page
  if (stage === 'mfa') {
    return (
      <AdminMfaPage
        mfaSessionId={mfaSessionId}
        mfaMethods={mfaMethods}
        onVerificationSuccess={handleMfaSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-white">💊</span>
          </div>
          <h1 className="text-3xl font-bold text-white">VitalMEDS</h1>
          <p className="text-slate-400 mt-2">Admin Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="bg-slate-800 rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Login</h2>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Email or Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Email or Phone Number
            </label>
            <Input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="fiku456@gmail.com or 8895715145"
              disabled={loading}
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="bg-slate-700 border-slate-600 text-white pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>

          {/* Info */}
          <div className="bg-slate-700/50 rounded-lg p-3 mt-6">
            <p className="text-xs text-slate-300 mb-2">ℹ️ Login with your credentials, then verify with MFA</p>
            <p className="text-xs text-slate-400">Two-factor authentication required for security</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
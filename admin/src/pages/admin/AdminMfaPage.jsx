import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/services/api';

const AdminMfaPage = ({ mfaSessionId, mfaMethods, onVerificationSuccess }) => {
  const [code, setCode] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(mfaMethods?.current || 'google_authenticator');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Two timers: selectionCountdown (10 sec) and mainCountdown (3 min for verification)
  const [selectionCountdown, setSelectionCountdown] = useState(10);
  const [mainCountdown, setMainCountdown] = useState(180); // 3 minutes = 180 seconds
  const [methodSwitched, setMethodSwitched] = useState(false);
  const [autoSelectedMethod, setAutoSelectedMethod] = useState(false);

  // Selection countdown timer (10 seconds to choose method)
  useEffect(() => {
    if (selectionCountdown <= 0) {
      // Auto-select Google Authenticator after 10 seconds
      if (!methodSwitched && selectedMethod !== 'google_authenticator') {
        setSelectedMethod('google_authenticator');
        setAutoSelectedMethod(true);
        setSuccess('⏰ Auto-selected Google Authenticator');
        setTimeout(() => setSuccess(''), 3000);
      }
      return;
    }

    const interval = setInterval(() => {
      setSelectionCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectionCountdown, methodSwitched, selectedMethod]);

  // Main countdown timer (3 minutes for code entry)
  useEffect(() => {
    if (mainCountdown <= 0) {
      setError('❌ Code expired. Please login again.');
      return;
    }

    const interval = setInterval(() => {
      setMainCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [mainCountdown]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSwitchMethod = async (newMethod) => {
    if (newMethod === selectedMethod) return;

    setError('');
    setLoading(true);
    setCode('');

    try {
      const response = await api.post('/admin/auth/mfa/send', {
        mfaSessionId,
        method: newMethod
      });

      setSelectedMethod(newMethod);
      setMethodSwitched(true);
      setSelectionCountdown(0); // Stop selection countdown
      setMainCountdown(180); // Reset to 3 minutes
      setSuccess(`✅ Code sent to ${newMethod === 'email' ? 'your email' : 'your phone'}`);

      setTimeout(() => setSuccess(''), 3000);
      console.log(`📤 MFA code sent via: ${newMethod}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!code) {
      setError('Please enter the verification code');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/admin/auth/mfa/verify', {
        mfaSessionId,
        code,
        method: selectedMethod
      });

      if (response.data?.token) {
        setSuccess('✅ Verified! Logging you in...');

        setTimeout(() => {
          if (onVerificationSuccess) {
            onVerificationSuccess(response.data.token);
          }
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMethodLabel = (method) => {
    const labels = {
      google_authenticator: '🔐 Google Authenticator',
      email: '📧 Email',
      sms: '📱 SMS'
    };
    return labels[method] || method;
  };

  const getMethodDescription = (method) => {
    const descriptions = {
      google_authenticator: 'Open your Google Authenticator app to get the code',
      email: 'We sent a code to your email',
      sms: 'We sent a code to your phone'
    };
    return descriptions[method] || '';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-white">🔐</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Verify Your Identity</h1>
          <p className="text-slate-400 mt-2">Two-Factor Authentication</p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="bg-slate-800 rounded-lg p-8 space-y-6">
          {/* Timer Display */}
          <div className="flex justify-between items-center px-4 py-3 bg-slate-700/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-slate-300">Code expires in:</span>
            </div>
            <span className={`font-mono font-bold text-lg ${
              mainCountdown <= 30 ? 'text-red-400' : 
              mainCountdown <= 60 ? 'text-amber-400' : 
              'text-green-400'
            }`}>
              {formatTime(mainCountdown)}
            </span>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-green-200 text-sm">{success}</p>
            </div>
          )}

          {/* Method Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-200">
                Choose Verification Method:
              </label>
              {selectionCountdown > 0 && !methodSwitched && (
                <span className="text-xs text-amber-400 font-semibold">
                  Auto-select in {selectionCountdown}s
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3">
              {mfaMethods?.available?.map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => handleSwitchMethod(method)}
                  disabled={loading}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedMethod === method
                      ? 'border-green-500 bg-green-900/30 text-green-200'
                      : 'border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="font-medium text-sm flex justify-between items-center">
                    <span>{getMethodLabel(method)}</span>
                    {selectedMethod === method && (
                      <span className="text-xs bg-green-500/20 px-2 py-1 rounded">✓ Selected</span>
                    )}
                  </div>
                  {selectedMethod === method && (
                    <div className="text-xs text-green-300 mt-1">
                      {getMethodDescription(method)}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Code Input */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Enter 6-digit Verification Code
            </label>
            <Input
              type="text"
              maxLength="6"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              disabled={loading || mainCountdown <= 0}
              className="bg-slate-700 border-slate-600 text-white text-center text-2xl tracking-widest font-bold"
            />
            <p className="text-xs text-slate-400 mt-2">
              Enter the code from <strong>{getMethodLabel(selectedMethod)}</strong>
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || mainCountdown <= 0 || code.length !== 6}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : mainCountdown <= 0 ? (
              'Code Expired - Login Again'
            ) : (
              'Verify'
            )}
          </Button>

          {/* Info */}
          <div className="bg-slate-700/50 rounded-lg p-3 text-center">
            <p className="text-xs text-slate-300">
              ⏱️ You have <strong>{formatTime(mainCountdown)}</strong> to enter your code
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminMfaPage;
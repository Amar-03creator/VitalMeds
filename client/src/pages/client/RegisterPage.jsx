import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/useTheme';
import { User, Loader2 } from 'lucide-react';
import api from '@/services/api';

// Registration Components
import RegisterHeader from '@/components/client/registration/RegisterHeader';
import RegisterCardHeader from '@/components/client/registration/RegisterCardHeader';
import RegistrationAlerts from '@/components/client/registration/RegistrationAlerts';
import BusinessInformation from '@/components/client/registration/BusinessInformation';
import VerificationDocuments from '@/components/client/registration/VerificationDocuments';
import AccountInformation from '@/components/client/registration/AccountInformation';
import AddressInformation from '@/components/client/registration/AddressInformation';

// Validation utility
import { validateRegistrationForm } from '@/utils/registrationValidation';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const isDark =
    theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Form state
  const [formData, setFormData] = useState({
    establishmentName: '',
    ownerName: '',
    designation: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    gstin: '',
    aadhaar: '',
    panNumber: '',
    drugLicenseNumber: '',
    businessType: 'retail_pharmacy'
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    // Validate form
    const validationErrors = validateRegistrationForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const apiData = {
        shopName: formData.establishmentName,
        ownerName: formData.ownerName,
        designation: formData.designation,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        address: formData.address,
        businessType: formData.businessType
      };

      if (formData.gstin) apiData.gstin = formData.gstin;
      if (formData.aadhaar) apiData.aadhaar = formData.aadhaar;
      if (formData.panNumber) apiData.panNumber = formData.panNumber;
      if (formData.drugLicenseNumber) apiData.drugLicenseNumber = formData.drugLicenseNumber;

      const response = await api.post('/auth/register', apiData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      setSuccessMessage('Registration successful! Welcome to VitalMEDS.');

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);

      if (error.response?.data) {
        const { message, errors: serverErrors } = error.response.data;

        if (serverErrors) {
          setErrors(serverErrors);
        } else {
          setErrors({ general: message || 'Registration failed. Please try again.' });
        }
      } else if (error.request) {
        setErrors({ general: 'Unable to connect to server. Please check your internet connection.' });
      } else {
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Styling
  const inputStyle = {
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    borderColor: isDark ? '#475569' : '#cbd5e1',
    color: isDark ? '#f1f5f9' : '#0f172a'
  };

  const labelStyle = {
    color: isDark ? '#f1f5f9' : '#0f172a'
  };

  const iconStyle = {
    color: isDark ? '#64748b' : '#94a3b8'
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
      <RegisterHeader theme={theme} onToggleTheme={toggleTheme} isDark={isDark} />

      <Card
        className="w-full max-w-3xl mx-auto shadow-xl mt-16"
        style={{
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#334155' : '#e2e8f0'
        }}
      >
        <RegisterCardHeader isDark={isDark} />

        <CardContent>
          <RegistrationAlerts
            successMessage={successMessage}
            errorMessage={errors.general}
            isDark={isDark}
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            <BusinessInformation
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
              onSelectChange={handleSelectChange}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
            />

            <VerificationDocuments
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              iconStyle={iconStyle}
              isDark={isDark}
            />

            <AccountInformation
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              iconStyle={iconStyle}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <AddressInformation
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
            />

            {/* Terms and Info */}
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(241, 245, 249, 0.8)'
              }}
            >
              <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                By registering, you agree to our{' '}
                <span
                  className="cursor-pointer hover:underline"
                  style={{ color: isDark ? '#60a5fa' : '#2563eb' }}
                >
                  Terms of Service
                </span>{' '}
                and{' '}
                <span
                  className="cursor-pointer hover:underline"
                  style={{ color: isDark ? '#60a5fa' : '#2563eb' }}
                >
                  Privacy Policy
                </span>
                . Your account will be under "Pending Approval" status until admin verification. You are
                eligible to view products until approval. For approval, provide either your GSTIN + Drug
                License OR Aadhaar + PAN number.
              </p>
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
                  Creating Account...
                </>
              ) : (
                <>
                  <User className="w-5 h-5 mr-2" />
                  Create Business Account
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
            Already have an account?{' '}
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => navigate('/login')}
              style={{ color: isDark ? '#60a5fa' : '#2563eb' }}
            >
              Sign in here
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;

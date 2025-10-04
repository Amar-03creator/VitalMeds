import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeProvider';
import {
  User,
  Mail,
  Lock,
  Building,
  MapPin,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Phone,
  FileText,
  ArrowLeft,
  Moon,
  Sun
} from 'lucide-react';
import api from '@/services/api';


const RegisterPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

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
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.establishmentName.trim()) newErrors.establishmentName = 'Establishment name is required';
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Password confirmation is required';

    if (!formData.address.street.trim()) newErrors['address.street'] = 'Street address is required';
    if (!formData.address.city.trim()) newErrors['address.city'] = 'City is required';
    if (!formData.address.state.trim()) newErrors['address.state'] = 'State is required';
    if (!formData.address.pincode.trim()) newErrors['address.pincode'] = 'Pincode is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (formData.address.pincode && !pincodeRegex.test(formData.address.pincode)) {
      newErrors['address.pincode'] = 'Please enter a valid 6-digit pincode';
    }

    if (formData.gstin) {
      const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstinRegex.test(formData.gstin.toUpperCase())) {
        newErrors.gstin = 'Please enter a valid 15-digit GSTIN';
      }
    }

    if (formData.aadhaar) {
      const aadhaarRegex = /^[2-9]{1}[0-9]{11}$/;
      if (!aadhaarRegex.test(formData.aadhaar)) {
        newErrors.aadhaar = 'Please enter a valid 12-digit Aadhaar number';
      }
    }

    if (formData.panNumber) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(formData.panNumber.toUpperCase())) {
        newErrors.panNumber = 'Please enter a valid PAN number (e.g., ABCDE1234F)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    if (!validateForm()) {
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

      console.log('Registration successful:', response.data);

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
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <Link to="/">
          <Button
            variant="ghost"
            style={{ color: isDark ? '#cbd5e1' : '#475569' }}
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


      <Card
        className="w-full max-w-3xl mx-auto shadow-xl mt-16"
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
            Join VitalMEDS
          </CardTitle>
          <CardDescription style={{ color: isDark ? '#cbd5e1' : '#64748b' }}>
            Create your business account for pharmaceutical partnership
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
            B2B Platform
          </Badge>
        </CardHeader>

        <CardContent>
          {/* Success Message */}
          {successMessage && (
            <Alert
              className="mb-6"
              style={{
                backgroundColor: isDark ? 'rgba(34, 197, 94, 0.1)' : '#f0fdf4',
                borderColor: isDark ? '#22c55e' : '#bbf7d0',
                color: isDark ? '#4ade80' : '#15803d'
              }}
            >
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                {successMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* General Error Message */}
          {errors.general && (
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
                {errors.general}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Information Section */}
            <div className="space-y-4">
              <h3
                className="text-lg font-semibold flex items-center"
                style={labelStyle}
              >
                <Building className="w-5 h-5 mr-2" />
                Business Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="establishmentName" style={labelStyle}>Name of the Establishment *</Label>
                  <Input
                    id="establishmentName"
                    name="establishmentName"
                    type="text"
                    placeholder="e.g. MediCare Pharmacy"
                    value={formData.establishmentName}
                    onChange={handleInputChange}
                    style={inputStyle}
                    className={errors.establishmentName ? 'border-red-500' : ''}
                  />
                  {errors.establishmentName && (
                    <p className="text-sm" style={{ color: '#dc2626' }}>{errors.establishmentName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerName" style={labelStyle}>Owner/Contact Name *</Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    type="text"
                    placeholder="e.g. Dr. John Smith"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    style={inputStyle}
                    className={errors.ownerName ? 'border-red-500' : ''}
                  />
                  {errors.ownerName && (
                    <p className="text-sm" style={{ color: '#dc2626' }}>{errors.ownerName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="designation" style={labelStyle}>Designation *</Label>
                  <Select value={formData.designation} onValueChange={(value) => handleSelectChange('designation', value)}>
                    <SelectTrigger className={errors.designation ? 'border-red-500' : ''} style={inputStyle}>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="pharmacist">Pharmacist</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.designation && (
                    <p className="text-sm" style={{ color: '#dc2626' }}>{errors.designation}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType" style={labelStyle}>Business Type</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleSelectChange('businessType', value)}>
                    <SelectTrigger style={inputStyle}>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail_pharmacy">Retail Pharmacy</SelectItem>
                      <SelectItem value="hospital">Hospital</SelectItem>
                      <SelectItem value="clinic">Clinic</SelectItem>
                      <SelectItem value="distributor">Distributor</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Verification Documents Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center" style={labelStyle}>
                <FileText className="w-5 h-5 mr-2" />
                Verification Documents
              </h3>
              <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                For verification, provide either: <strong>GSTIN + Drug License Number</strong> OR <strong>Aadhaar + PAN Number</strong>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gstin" style={labelStyle}>GSTIN (Optional)</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={iconStyle} />
                    <Input
                      id="gstin"
                      name="gstin"
                      type="text"
                      placeholder="e.g. 27AAECM1234A1ZX"
                      value={formData.gstin}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.gstin ? 'border-red-500' : ''}`}
                      style={inputStyle}
                      maxLength="15"
                    />
                  </div>
                  {errors.gstin && (
                    <p className="text-sm" style={{ color: '#dc2626' }}>{errors.gstin}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="drugLicenseNumber" style={labelStyle}>Drug License Number (Optional)</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={iconStyle} />
                    <Input
                      id="drugLicenseNumber"
                      name="drugLicenseNumber"
                      type="text"
                      placeholder="e.g. MH-MUM-20C-12345"
                      value={formData.drugLicenseNumber}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.drugLicenseNumber ? 'border-red-500' : ''}`}
                      style={inputStyle}
                    />
                  </div>
                  {errors.drugLicenseNumber && (
                    <p className="text-sm" style={{ color: '#dc2626' }}>{errors.drugLicenseNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aadhaar" style={labelStyle}>Aadhaar Number (Optional)</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={iconStyle} />
                    <Input
                      id="aadhaar"
                      name="aadhaar"
                      type="text"
                      placeholder="e.g. 123456789012"
                      value={formData.aadhaar}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.aadhaar ? 'border-red-500' : ''}`}
                      style={inputStyle}
                      maxLength="12"
                    />
                  </div>
                  {errors.aadhaar && (
                    <p className="text-sm" style={{ color: '#dc2626' }}>{errors.aadhaar}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="panNumber" style={labelStyle}>PAN Number (Optional)</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={iconStyle} />
                    <Input
                      id="panNumber"
                      name="panNumber"
                      type="text"
                      placeholder="e.g. ABCDE1234F"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.panNumber ? 'border-red-500' : ''}`}
                      style={inputStyle}
                      maxLength="10"
                    />
                  </div>
                  {errors.panNumber && (
                    <p className="text-sm" style={{ color: '#dc2626' }}>{errors.panNumber}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Account Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center" style={labelStyle}>
                <User className="w-5 h-5 mr-2" />
                Account Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" style={labelStyle}>Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={iconStyle} />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      style={inputStyle}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm" style={{ color: '#dc2626' }}>{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" style={labelStyle}>Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={iconStyle} />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="9876543210"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                      style={inputStyle}
                      maxLength="10"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-sm" style={{ color: '#dc2626' }}>{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" style={labelStyle}>Password for Login *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={iconStyle} />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      style={inputStyle}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                      style={iconStyle}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm" style={{ color: '#dc2626' }}>{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" style={labelStyle}>Confirm Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={iconStyle} />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      style={inputStyle}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={iconStyle}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm" style={{ color: '#dc2626' }}>{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center" style={labelStyle}>
                <MapPin className="w-5 h-5 mr-2" />
                Business Address
              </h3>

              <div className="space-y-2">
                <Label htmlFor="address.street" style={labelStyle}>Street Address *</Label>
                <Input
                  id="address.street"
                  name="address.street"
                  type="text"
                  placeholder="Street address, building number"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  style={inputStyle}
                  className={errors['address.street'] ? 'border-red-500' : ''}
                />
                {errors['address.street'] && (
                  <p className="text-sm" style={{ color: '#dc2626' }}>{errors['address.street']}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address.city" style={labelStyle}>City *</Label>
                  <Input
                    id="address.city"
                    name="address.city"
                    type="text"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    style={inputStyle}
                    className={errors['address.city'] ? 'border-red-500' : ''}
                  />
                  {errors['address.city'] && (
                    <p className="text-sm" style={{ color: '#dc2626' }}>{errors['address.city']}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address.state" style={labelStyle}>State *</Label>
                  <Input
                    id="address.state"
                    name="address.state"
                    type="text"
                    placeholder="State"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    style={inputStyle}
                    className={errors['address.state'] ? 'border-red-500' : ''}
                  />
                  {errors['address.state'] && (
                    <p className="text-sm" style={{ color: '#dc2626' }}>{errors['address.state']}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address.pincode" style={labelStyle}>Pincode *</Label>
                  <Input
                    id="address.pincode"
                    name="address.pincode"
                    type="text"
                    placeholder="6-digit pincode"
                    value={formData.address.pincode}
                    onChange={handleInputChange}
                    style={inputStyle}
                    className={errors['address.pincode'] ? 'border-red-500' : ''}
                    maxLength="6"
                  />
                  {errors['address.pincode'] && (
                    <p className="text-sm" style={{ color: '#dc2626' }}>{errors['address.pincode']}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Terms and Info */}
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(241, 245, 249, 0.8)'
              }}
            >
              <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                By registering, you agree to our <span className="cursor-pointer hover:underline" style={{ color: isDark ? '#60a5fa' : '#2563eb' }}>Terms of Service</span> and <span className="cursor-pointer hover:underline" style={{ color: isDark ? '#60a5fa' : '#2563eb' }}>Privacy Policy</span>.
                Your account will be under "Pending Approval" status until admin verification.
                You are eligible to view products until approval. For approval, provide either your
                GSTIN + Drug License OR Aadhaar + PAN number.
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

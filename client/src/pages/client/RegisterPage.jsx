import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
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
  FileText
} from 'lucide-react';
import api from '@/services/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

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

    // Clear specific field error when user starts typing
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

    // Clear field error
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

    // Required fields validation
    if (!formData.establishmentName.trim()) newErrors.establishmentName = 'Establishment name is required';
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Password confirmation is required';

    // Address validation
    if (!formData.address.street.trim()) newErrors['address.street'] = 'Street address is required';
    if (!formData.address.city.trim()) newErrors['address.city'] = 'City is required';
    if (!formData.address.state.trim()) newErrors['address.state'] = 'State is required';
    if (!formData.address.pincode.trim()) newErrors['address.pincode'] = 'Pincode is required';

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone number validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Password confirmation validation
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Pincode validation
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (formData.address.pincode && !pincodeRegex.test(formData.address.pincode)) {
      newErrors['address.pincode'] = 'Please enter a valid 6-digit pincode';
    }

    // GSTIN validation (optional)
    if (formData.gstin) {
      const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstinRegex.test(formData.gstin.toUpperCase())) {
        newErrors.gstin = 'Please enter a valid 15-digit GSTIN';
      }
    }

    // Aadhaar validation (optional)
    if (formData.aadhaar) {
      const aadhaarRegex = /^[2-9]{1}[0-9]{11}$/;
      if (!aadhaarRegex.test(formData.aadhaar)) {
        newErrors.aadhaar = 'Please enter a valid 12-digit Aadhaar number';
      }
    }

    // PAN validation (optional)
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

    // Client-side validation
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data for API
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

      // Add optional fields only if they exist
      if (formData.gstin) apiData.gstin = formData.gstin;
      if (formData.aadhaar) apiData.aadhaar = formData.aadhaar;
      if (formData.panNumber) apiData.panNumber = formData.panNumber;
      if (formData.drugLicenseNumber) apiData.drugLicenseNumber = formData.drugLicenseNumber;

      // Make API call
      const response = await api.post('/auth/register', apiData);

      console.log('Registration successful:', response.data);

      // Store token if provided
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      setSuccessMessage('Registration successful! Welcome to VitalMEDS.');

      // Redirect after a short delay
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl mx-auto shadow-xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold text-primary">Join VitalMEDS</CardTitle>
          <CardDescription className="text-lg">
            Create your business account for pharmaceutical partnership
          </CardDescription>
          <Badge variant="outline" className="w-fit mx-auto mt-2">
            <Building className="w-4 h-4 mr-1" />
            B2B Platform
          </Badge>
        </CardHeader>

        <CardContent>
          {/* Success Message */}
          {successMessage && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                {successMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* General Error Message */}
          {errors.general && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errors.general}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Business Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="establishmentName">Name of the Establishment *</Label>
                  <Input
                    id="establishmentName"
                    name="establishmentName"
                    type="text"
                    placeholder="e.g. MediCare Pharmacy"
                    value={formData.establishmentName}
                    onChange={handleInputChange}
                    className={errors.establishmentName ? 'border-red-500' : ''}
                  />
                  {errors.establishmentName && (
                    <p className="text-sm text-red-600">{errors.establishmentName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner/Contact Name *</Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    type="text"
                    placeholder="e.g. Dr. John Smith"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className={errors.ownerName ? 'border-red-500' : ''}
                  />
                  {errors.ownerName && (
                    <p className="text-sm text-red-600">{errors.ownerName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation *</Label>
                  <Select value={formData.designation} onValueChange={(value) => handleSelectChange('designation', value)}>
                    <SelectTrigger className={errors.designation ? 'border-red-500' : ''}>
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
                    <p className="text-sm text-red-600">{errors.designation}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleSelectChange('businessType', value)}>
                    <SelectTrigger>
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
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Verification Documents
              </h3>
              <p className="text-sm text-muted-foreground">
                For verification, provide either: <strong>GSTIN + Drug License Number</strong> OR <strong>Aadhaar + PAN Number</strong>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gstin">GSTIN (Optional)</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="gstin"
                      name="gstin"
                      type="text"
                      placeholder="e.g. 27AAECM1234A1ZX"
                      value={formData.gstin}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.gstin ? 'border-red-500' : ''}`}
                      maxLength="15"
                    />
                  </div>
                  {errors.gstin && (
                    <p className="text-sm text-red-600">{errors.gstin}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="drugLicenseNumber">Drug License Number (Optional)</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="drugLicenseNumber"
                      name="drugLicenseNumber"
                      type="text"
                      placeholder="e.g. MH-MUM-20C-12345"
                      value={formData.drugLicenseNumber}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.drugLicenseNumber ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.drugLicenseNumber && (
                    <p className="text-sm text-red-600">{errors.drugLicenseNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aadhaar">Aadhaar Number (Optional)</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="aadhaar"
                      name="aadhaar"
                      type="text"
                      placeholder="e.g. 123456789012"
                      value={formData.aadhaar}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.aadhaar ? 'border-red-500' : ''}`}
                      maxLength="12"
                    />
                  </div>
                  {errors.aadhaar && (
                    <p className="text-sm text-red-600">{errors.aadhaar}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="panNumber">PAN Number (Optional)</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="panNumber"
                      name="panNumber"
                      type="text"
                      placeholder="e.g. ABCDE1234F"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.panNumber ? 'border-red-500' : ''}`}
                      maxLength="10"
                    />
                  </div>
                  {errors.panNumber && (
                    <p className="text-sm text-red-600">{errors.panNumber}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Account Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <User className="w-5 h-5 mr-2" />
                Account Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="9876543210"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                      maxLength="10"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-sm text-red-600">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password for Login *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Business Address
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="address.street">Street Address *</Label>
                <Input
                  id="address.street"
                  name="address.street"
                  type="text"
                  placeholder="Street address, building number"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className={errors['address.street'] ? 'border-red-500' : ''}
                />
                {errors['address.street'] && (
                  <p className="text-sm text-red-600">{errors['address.street']}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address.city">City *</Label>
                  <Input
                    id="address.city"
                    name="address.city"
                    type="text"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    className={errors['address.city'] ? 'border-red-500' : ''}
                  />
                  {errors['address.city'] && (
                    <p className="text-sm text-red-600">{errors['address.city']}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address.state">State *</Label>
                  <Input
                    id="address.state"
                    name="address.state"
                    type="text"
                    placeholder="State"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    className={errors['address.state'] ? 'border-red-500' : ''}
                  />
                  {errors['address.state'] && (
                    <p className="text-sm text-red-600">{errors['address.state']}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address.pincode">Pincode *</Label>
                  <Input
                    id="address.pincode"
                    name="address.pincode"
                    type="text"
                    placeholder="6-digit pincode"
                    value={formData.address.pincode}
                    onChange={handleInputChange}
                    className={errors['address.pincode'] ? 'border-red-500' : ''}
                    maxLength="6"
                  />
                  {errors['address.pincode'] && (
                    <p className="text-sm text-red-600">{errors['address.pincode']}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Terms and Info */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                By registering, you agree to our <span className="text-primary cursor-pointer hover:underline">Terms of Service</span> and <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>. 
                Your account will be under "Pending Approval" status until admin verification. 
                You are eligible to view products until approval. For approval, provide either your 
                GSTIN + Drug License OR Aadhaar + PAN number.
              </p>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold" 
              disabled={isLoading}
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
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/login')}>
              Sign in here
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';

const AccountInformation = ({
  formData,
  errors,
  onChange,
  inputStyle,
  labelStyle,
  iconStyle,
  showPassword,
  showConfirmPassword,
  onTogglePassword,
  onToggleConfirmPassword
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center" style={labelStyle}>
        <User className="w-5 h-5 mr-2" />
        Account Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" style={labelStyle}>
            Email Address *
          </Label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
              style={iconStyle}
            />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={onChange}
              className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
              style={inputStyle}
            />
          </div>
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber" style={labelStyle}>
            Phone Number *
          </Label>
          <div className="relative">
            <Phone
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
              style={iconStyle}
            />
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="9876543210"
              value={formData.phoneNumber}
              onChange={onChange}
              className={`pl-10 ${errors.phoneNumber ? 'border-red-500' : ''}`}
              style={inputStyle}
              maxLength="10"
            />
          </div>
          {errors.phoneNumber && <p className="text-sm text-red-600">{errors.phoneNumber}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password" style={labelStyle}>
            Password for Login *
          </Label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
              style={iconStyle}
            />
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={formData.password}
              onChange={onChange}
              className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
              style={inputStyle}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={onTogglePassword}
              style={iconStyle}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" style={labelStyle}>
            Confirm Password *
          </Label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
              style={iconStyle}
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={onChange}
              className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              style={inputStyle}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={onToggleConfirmPassword}
              style={iconStyle}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;

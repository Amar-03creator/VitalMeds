import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FileText, CreditCard } from 'lucide-react';

const VerificationDocuments = ({ formData, errors, onChange, inputStyle, labelStyle, iconStyle, isDark }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center" style={labelStyle}>
        <FileText className="w-5 h-5 mr-2" />
        Verification Documents
      </h3>
      <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
        For verification, provide either: <strong>GSTIN + Drug License Number</strong> OR{' '}
        <strong>Aadhaar + PAN Number</strong>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gstin" style={labelStyle}>
            GSTIN (Optional)
          </Label>
          <div className="relative">
            <CreditCard
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
              style={iconStyle}
            />
            <Input
              id="gstin"
              name="gstin"
              type="text"
              placeholder="e.g. 27AAECM1234A1ZX"
              value={formData.gstin}
              onChange={onChange}
              className={`pl-10 ${errors.gstin ? 'border-red-500' : ''}`}
              style={inputStyle}
              maxLength="15"
            />
          </div>
          {errors.gstin && <p className="text-sm text-red-600">{errors.gstin}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="drugLicenseNumber" style={labelStyle}>
            Drug License Number (Optional)
          </Label>
          <div className="relative">
            <FileText
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
              style={iconStyle}
            />
            <Input
              id="drugLicenseNumber"
              name="drugLicenseNumber"
              type="text"
              placeholder="e.g. MH-MUM-20C-12345"
              value={formData.drugLicenseNumber}
              onChange={onChange}
              className={`pl-10 ${errors.drugLicenseNumber ? 'border-red-500' : ''}`}
              style={inputStyle}
            />
          </div>
          {errors.drugLicenseNumber && (
            <p className="text-sm text-red-600">{errors.drugLicenseNumber}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="aadhaar" style={labelStyle}>
            Aadhaar Number (Optional)
          </Label>
          <div className="relative">
            <CreditCard
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
              style={iconStyle}
            />
            <Input
              id="aadhaar"
              name="aadhaar"
              type="text"
              placeholder="e.g. 123456789012"
              value={formData.aadhaar}
              onChange={onChange}
              className={`pl-10 ${errors.aadhaar ? 'border-red-500' : ''}`}
              style={inputStyle}
              maxLength="12"
            />
          </div>
          {errors.aadhaar && <p className="text-sm text-red-600">{errors.aadhaar}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="panNumber" style={labelStyle}>
            PAN Number (Optional)
          </Label>
          <div className="relative">
            <CreditCard
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
              style={iconStyle}
            />
            <Input
              id="panNumber"
              name="panNumber"
              type="text"
              placeholder="e.g. ABCDE1234F"
              value={formData.panNumber}
              onChange={onChange}
              className={`pl-10 ${errors.panNumber ? 'border-red-500' : ''}`}
              style={inputStyle}
              maxLength="10"
            />
          </div>
          {errors.panNumber && <p className="text-sm text-red-600">{errors.panNumber}</p>}
        </div>
      </div>
    </div>
  );
};

export default VerificationDocuments;

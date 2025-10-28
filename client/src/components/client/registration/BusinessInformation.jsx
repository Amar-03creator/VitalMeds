import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building } from 'lucide-react';

const BusinessInformation = ({ formData, errors, onChange, onSelectChange, inputStyle, labelStyle }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center" style={labelStyle}>
        <Building className="w-5 h-5 mr-2" />
        Business Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="establishmentName" style={labelStyle}>
            Name of the Establishment *
          </Label>
          <Input
            id="establishmentName"
            name="establishmentName"
            type="text"
            placeholder="e.g. MediCare Pharmacy"
            value={formData.establishmentName}
            onChange={onChange}
            style={inputStyle}
            className={errors.establishmentName ? 'border-red-500' : ''}
          />
          {errors.establishmentName && (
            <p className="text-sm text-red-600">{errors.establishmentName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ownerName" style={labelStyle}>
            Owner/Contact Name *
          </Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            placeholder="e.g. Dr. John Smith"
            value={formData.ownerName}
            onChange={onChange}
            style={inputStyle}
            className={errors.ownerName ? 'border-red-500' : ''}
          />
          {errors.ownerName && (
            <p className="text-sm text-red-600">{errors.ownerName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="designation" style={labelStyle}>
            Designation *
          </Label>
          <Select
            value={formData.designation}
            onValueChange={(value) => onSelectChange('designation', value)}
          >
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
            <p className="text-sm text-red-600">{errors.designation}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessType" style={labelStyle}>
            Business Type
          </Label>
          <Select
            value={formData.businessType}
            onValueChange={(value) => onSelectChange('businessType', value)}
          >
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
  );
};

export default BusinessInformation;

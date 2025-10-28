import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

const AddressInformation = ({ formData, errors, onChange, inputStyle, labelStyle }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center" style={labelStyle}>
        <MapPin className="w-5 h-5 mr-2" />
        Business Address
      </h3>

      <div className="space-y-2">
        <Label htmlFor="address.street" style={labelStyle}>
          Street Address *
        </Label>
        <Input
          id="address.street"
          name="address.street"
          type="text"
          placeholder="Street address, building number"
          value={formData.address.street}
          onChange={onChange}
          style={inputStyle}
          className={errors['address.street'] ? 'border-red-500' : ''}
        />
        {errors['address.street'] && <p className="text-sm text-red-600">{errors['address.street']}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address.city" style={labelStyle}>
            City *
          </Label>
          <Input
            id="address.city"
            name="address.city"
            type="text"
            placeholder="City"
            value={formData.address.city}
            onChange={onChange}
            style={inputStyle}
            className={errors['address.city'] ? 'border-red-500' : ''}
          />
          {errors['address.city'] && <p className="text-sm text-red-600">{errors['address.city']}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address.state" style={labelStyle}>
            State *
          </Label>
          <Input
            id="address.state"
            name="address.state"
            type="text"
            placeholder="State"
            value={formData.address.state}
            onChange={onChange}
            style={inputStyle}
            className={errors['address.state'] ? 'border-red-500' : ''}
          />
          {errors['address.state'] && <p className="text-sm text-red-600">{errors['address.state']}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address.pincode" style={labelStyle}>
            Pincode *
          </Label>
          <Input
            id="address.pincode"
            name="address.pincode"
            type="text"
            placeholder="6-digit pincode"
            value={formData.address.pincode}
            onChange={onChange}
            style={inputStyle}
            className={errors['address.pincode'] ? 'border-red-500' : ''}
            maxLength="6"
          />
          {errors['address.pincode'] && <p className="text-sm text-red-600">{errors['address.pincode']}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddressInformation;

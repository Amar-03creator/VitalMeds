export const validateRegistrationForm = (formData) => {
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

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && !emailRegex.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address';
  }

  // Phone validation
  const phoneRegex = /^[6-9]\d{9}$/;
  if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
    newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
  }

  // Password validation
  if (formData.password && formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters long';
  }

  if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
  }

  // Pincode validation
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  if (formData.address.pincode && !pincodeRegex.test(formData.address.pincode)) {
    newErrors['address.pincode'] = 'Please enter a valid 6-digit pincode';
  }

  // GSTIN validation
  if (formData.gstin) {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gstinRegex.test(formData.gstin.toUpperCase())) {
      newErrors.gstin = 'Please enter a valid 15-digit GSTIN';
    }
  }

  // Aadhaar validation
  if (formData.aadhaar) {
    const aadhaarRegex = /^[2-9]{1}[0-9]{11}$/;
    if (!aadhaarRegex.test(formData.aadhaar)) {
      newErrors.aadhaar = 'Please enter a valid 12-digit Aadhaar number';
    }
  }

  // PAN validation
  if (formData.panNumber) {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.panNumber.toUpperCase())) {
      newErrors.panNumber = 'Please enter a valid PAN number (e.g., ABCDE1234F)';
    }
  }

  return newErrors;
};

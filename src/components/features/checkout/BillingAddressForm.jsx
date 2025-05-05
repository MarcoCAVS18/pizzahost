// src/components/features/checkout/BillingAddressForm.jsx
import React, { useState } from 'react';

const australianStates = [
  'Australian Capital Territory',
  'New South Wales',
  'Northern Territory',
  'Queensland',
  'South Australia',
  'Tasmania',
  'Victoria',
  'Western Australia'
];

const BillingAddressForm = () => {
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    country: 'Australia',
    postalCode: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        return value.trim() ? '' : 'First name is required';
      case 'lastName':
        return value.trim() ? '' : 'Last name is required';
      case 'address':
        return value.trim() ? '' : 'Address is required';
      case 'city':
        return value.trim() ? '' : 'City is required';
      case 'state':
        return value ? '' : 'State is required';
      case 'postalCode':
        return /^\d{4}$/.test(value) ? '' : 'Please enter a valid 4-digit postal code';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const renderInput = (name, label, placeholder) => (
    <div className={errors[name] && touched[name] ? 'error mb-3' : 'mb-3'}>
      <label className="block text-sm font-serif text-gray-600 mb-1">
        {label} <span className="text-darkRed">*</span>
      </label>
      <input
        type="text"
        name={name}
        value={billingInfo[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`mt-1 block w-full px-4 py-2 border rounded-md font-semibold bg-transparent font-serif ${
          touched[name]
            ? errors[name]
              ? 'border-darkRed'
              : 'border-green-500'
            : 'border-gray-300'
        }`}
      />
      {errors[name] && touched[name] && (
        <p className="mt-1 text-xs text-red-500 font-serif">{errors[name]}</p>
      )}
    </div>
  );

  const renderSelect = (name, label) => (
    <div className={errors[name] && touched[name] ? 'error mb-3' : 'mb-3'}>
      <label className="block text-sm font-serif text-gray-600 mb-1">
        {label} <span className="text-darkRed">*</span>
      </label>
      <select
        name={name}
        value={billingInfo[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`mt-1 block w-full px-4 py-2 border rounded-md font-semibold bg-transparent font-serif ${
          touched[name]
            ? errors[name]
              ? 'border-darkRed'
              : 'border-green-500'
            : 'border-gray-300'
        }`}
      >
        <option value="">Select {label}</option>
        {australianStates.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      {errors[name] && touched[name] && (
        <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="font-serif font-semibold mb-3">Billing Address</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput('fullName', 'First Name', 'Your name')}
        {renderInput('lastName', 'Last Name', 'Your lastname')}
      </div>
      
      {renderInput('address', 'Address', 'Your address')}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput('city', 'City', 'City')}
        {renderInput('postalCode', 'Postal Code', 'Post Code')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderSelect('state', 'State')}
        <div className="mb-3">
          <label className="block text-sm font-serif text-gray-600 mb-1">Country</label>
          <input
            type="text"
            value={billingInfo.country}
            disabled
            className="mt-1 block w-full px-4 py-2 border rounded-md font-semibold bg-transparent font-serif bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default BillingAddressForm;
// src/components/features/checkout/ShippingDetails.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { updateUserShippingInfo } from '../../../services/userService';
import Button from '../../ui/Button';

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

const ShippingDetails = ({ onSubmit, existingShippingInfo = null }) => {
  const { user } = useAuth();
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    country: 'Australia',
    postalCode: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isEditing, setIsEditing] = useState(!existingShippingInfo);
  const [isSaving, setIsSaving] = useState(false);

  // If existingShippingInfo changes (e.g., data finishes loading), update form
  useEffect(() => {
    if (existingShippingInfo) {
      setShippingInfo(prev => ({
        ...prev,
        ...existingShippingInfo,
        country: 'Australia'
      }));
    }
  }, [existingShippingInfo]);

  // Validation functions
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
      case 'phone':
        const phoneDigits = value.replace(/\D/g, '');
        return phoneDigits.length >= 8 ? '' : 'Please enter a valid phone number (min 8 digits)';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const phoneNumber = value.replace(/\D/g, '');
      setShippingInfo(prev => ({ ...prev, [name]: phoneNumber }));
      const error = validateField(name, phoneNumber);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    } else {
      setShippingInfo(prev => ({ ...prev, [name]: value }));
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const isFormValid = () => {
    const requiredFields = ['fullName', 'lastName', 'address', 'city', 'state', 'postalCode', 'phone', 'email'];
    
    // Check if all required fields have valid values
    const validFields = requiredFields.every(field => {
      const fieldValue = shippingInfo[field];
      const error = validateField(field, fieldValue);
      
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }));
        setTouched(prev => ({ ...prev, [field]: true }));
        return false;
      }
      
      return true;
    });
    
    return validFields;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isFormValid()) {
      // If the user is logged in and we're editing existing info, save to their profile
      if (user?.uid && existingShippingInfo && isEditing) {
        setIsSaving(true);
        try {
          await updateUserShippingInfo(user.uid, {
            ...shippingInfo,
            userId: user.uid
          });
          setIsEditing(false);
        } catch (error) {
          console.error('Error updating user shipping info:', error);
          // Show error message
        } finally {
          setIsSaving(false);
        }
      }
      
      // Continue with checkout either way
      onSubmit(shippingInfo);
    } else {
      console.error('Form validation failed');
    }
  };

  const renderInput = (name, label, placeholder) => (
    <div className={errors[name] && touched[name] ? 'error mb-4' : 'mb-4'}>
      <label className="block text-sm font-serif text-gray-600 mb-1">
        {label} <span className="text-darkRed">*</span>
      </label>
      <input
        type="text"
        name={name}
        value={shippingInfo[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={!isEditing}
        className={`mt-1 block w-full px-4 py-2 border rounded-md font-semibold bg-transparent font-serif ${
          !isEditing 
            ? 'bg-gray-100'
            : touched[name]
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
    <div className={errors[name] && touched[name] ? 'error mb-4' : 'mb-4'}>
      <label className="block text-sm font-serif text-gray-600 mb-1">
        {label} <span className="text-darkRed">*</span>
      </label>
      <select
        name={name}
        value={shippingInfo[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={!isEditing}
        className={`mt-1 block w-full px-4 py-2 border rounded-md font-semibold bg-transparent font-serif ${
          !isEditing 
            ? 'bg-gray-100'
            : touched[name]
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
    <div className="py-4">
      {/* Header with edit button if we have existing information */}
      {existingShippingInfo && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif font-semibold">Shipping Information</h2>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput('fullName', 'First Name', 'Your name')}
          {renderInput('lastName', 'Last Name', 'Your lastname')}
        </div>
        
        {renderInput('email', 'Email', 'your-email@email.com')}
        {renderInput('address', 'Address', 'Your Adress')}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput('city', 'City', 'City')}
          {renderInput('postalCode', 'Postal Code', 'Postal Code')}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderSelect('state', 'State')}
          <div className="mb-4">
            <label className="block text-sm font-serif text-gray-600 mb-1">Country</label>
            <input
              type="text"
              value={shippingInfo.country}
              disabled
              className="mt-1 block w-full px-4 py-2 border rounded-md font-semibold bg-transparent font-serif bg-gray-100"
            />
          </div>
        </div>

        {renderInput('phone', 'Phone Number', '0400123456')}
        
        <div className="pt-4 flex justify-end items-center">
          {isEditing && existingShippingInfo && (
            <p className="text-xs text-gray-500 mr-4">
              Note: Changes will update your profile information
            </p>
          )}
          <Button
            text={isSaving ? "Saving..." : "Continue to Payment"}
            type="submit"
            size="medium"
            textColor="text-white"
            bgColor="bg-darkRed"
            className="hover:bg-lightRed"
            disabled={isSaving}
          />
        </div>
      </form>
    </div>
  );
};

export default ShippingDetails;
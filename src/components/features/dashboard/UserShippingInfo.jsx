import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { getUserShippingInfo, updateUserShippingInfo } from '../../../services/userService';

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

const UserShippingInfo = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    country: 'Australia',
    postalCode: '',
    phone: '',
    userId: '',
  });

  useEffect(() => {
    const fetchShippingInfo = async () => {
      if (user?.uid) {
        try {
          const data = await getUserShippingInfo(user.uid);
          if (data) {
            setShippingInfo(prevState => ({
              ...prevState,
              ...data,
              country: 'Australia',
              userId: data.userId || user.uid.slice(-4),
            }));
          }
        } catch (error) {
          console.error('Failed to fetch user shipping info:', error);
        }
      }
    };

    fetchShippingInfo();
  }, [user]);

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
      case 'lastName':
        return value.trim() ? '' : 'This field is required';
      case 'address':
        return value.trim() ? '' : 'Address is required';
      case 'city':
        return value.trim() ? '' : 'City is required';
      case 'state':
        return value ? '' : 'Please select a state';
      case 'postalCode':
        return /^\d{4}$/.test(value) ? '' : 'Please enter a valid 4-digit postal code';
      case 'phone':
        const phoneDigits = value.replace(/\D/g, '');
        return phoneDigits.length >= 8 ? '' : 'Please enter a valid phone number';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Solo permitir números
      const phoneNumber = value.replace(/\D/g, '');
      setShippingInfo(prev => ({ ...prev, [name]: phoneNumber }));
    } else {
      setShippingInfo(prev => ({ ...prev, [name]: value }));
    }

    const error = validateField(name, name === 'phone' ? value.replace(/\D/g, '') : value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave();
    } else {
      setErrors({});
      setIsEditing(true);
    }
  };

  const isFormValid = () => {
    const requiredFields = ['fullName', 'lastName', 'address', 'city', 'state', 'postalCode', 'phone'];
    const newErrors = {};

    requiredFields.forEach(field => {
      const error = validateField(field, shippingInfo[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!user?.uid) return;

    if (isFormValid()) {
      try {
        await updateUserShippingInfo(user.uid, {
          ...shippingInfo,
          userId: user.uid.slice(-4)
        });
        setIsEditing(false);
      } catch (error) {
        console.error('Error saving shipping info:', error);
      }
    }
  };

  const renderInput = (name, label, placeholder) => (
    <div className={errors[name] ? 'error' : ''}>
      <label className="block text-sm font-serif text-gray-400">
        {label} <span className="text-darkRed">*</span>
      </label>
      <input
        type="text"
        name={name}
        value={shippingInfo[name]}
        onChange={handleChange}
        disabled={!isEditing}
        placeholder={placeholder}
        className={`mt-1 block w-full px-4 py-2 border rounded-md font-semibold bg-transparent font-serif ${
          isEditing ? 'border-darkRed' : ''
        } ${errors[name] ? 'border-red-500' : ''}`}
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  const renderSelect = (name, label) => (
    <div className={errors[name] ? 'error' : ''}>
      <label className="block text-sm font-serif text-gray-400">
        {label} <span className="text-darkRed">*</span>
      </label>
      <select
        name={name}
        value={shippingInfo[name]}
        onChange={handleChange}
        disabled={!isEditing}
        className={`mt-1 block w-full px-4 py-2 border rounded-md font-semibold bg-transparent font-serif ${
          isEditing ? 'border-darkRed' : ''
        } ${errors[name] ? 'border-red-500' : ''}`}
      >
        <option value="">Select {label}</option>
        {australianStates.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-lg mx-auto p-8 rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-oldstyle italic font-bold text-gray-800">
          Shipping Information
        </h2>
        <button
          onClick={handleEditToggle}
          className="text-darkRed hover:text-red-800 transition-colors"
        >
          {isEditing ? <FaSave className="text-xl" /> : <FaEdit className="text-xl" />}
        </button>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex space-x-4">
          <div className="w-1/2">
            {renderInput('fullName', 'First Name', 'Facundo')}
          </div>
          <div className="w-1/2">
            {renderInput('lastName', 'Last Name', 'Aguirre')}
          </div>
        </div>

        {renderInput('address', 'Address', 'La concha del pato 123')}

        <div className="flex space-x-4">
          <div className="w-2/5">
            {renderInput('city', 'City', 'Sydney')}
          </div>
          <div className="w-2/5">
            {renderSelect('state', 'State')}
          </div>
          <div className="w-1/5">
            <label className="block text-sm font-serif text-gray-400">Country</label>
            <input
              type="text"
              value={shippingInfo.country}
              disabled
              className="mt-1 block w-full px-4 py-2 border rounded-md font-semibold bg-transparent font-serif"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            {renderInput('postalCode', 'Postal Code', '2000')}
          </div>
          <div className="w-1/2">
            {renderInput('phone', 'Phone', '0444123456')}
          </div>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={handleSave}
            className={`w-full py-2 rounded-md transition-colors ${
              Object.keys(errors).length === 0
                ? 'bg-darkRed text-white hover:bg-lightRed'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={Object.keys(errors).length > 0}
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default UserShippingInfo;
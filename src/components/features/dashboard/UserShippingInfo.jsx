import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
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
  const [touched, setTouched] = useState({});
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
    const requiredFields = ['fullName', 'lastName', 'address', 'city', 'state', 'postalCode', 'phone'];
    return requiredFields.every(field => {
      const value = shippingInfo[field];
      return !validateField(field, value); 
    });
  };

  const handleSave = async () => {
    if (!user?.uid) return;

    const allFields = {
      fullName: true,
      lastName: true,
      address: true,
      city: true,
      state: true,
      postalCode: true,
      phone: true
    };
    setTouched(allFields);

    const newErrors = {};
    Object.keys(allFields).forEach(field => {
      const error = validateField(field, shippingInfo[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    setErrors(newErrors);

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
    <div className={errors[name] && touched[name] ? 'error' : ''}>
      <label className="block text-sm font-serif text-gray-400">
        {label} <span className="text-darkRed">*</span>
      </label>
      <input
        type="text"
        name={name}
        value={shippingInfo[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={!isEditing}
        placeholder={placeholder}
        className={`mt-1 block w-full px-4 py-2 border rounded-md font-semibold bg-transparent font-serif ${
          isEditing 
            ? touched[name]
              ? errors[name]
                ? 'border-darkRed'
                : 'border-green-500'
              : 'border-darkRed'
            : ''
        }`}
      />
      {errors[name] && touched[name] && (
        <p className="mt-1 text-xs text-red-500 font-serif">{errors[name]}</p>
      )}
    </div>
  );

  const renderSelect = (name, label) => (
    <div className={errors[name] && touched[name] ? 'error' : ''}>
      <label className="block text-sm font-serif text-gray-400">
        {label} <span className="text-darkRed">*</span>
      </label>
      <select
        name={name}
        value={shippingInfo[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={!isEditing}
        className={`mt-1 block w-full px-4 py-2 border rounded-md font-semibold bg-transparent font-serif ${
          isEditing 
            ? touched[name]
              ? errors[name]
                ? 'border-darkRed'
                : 'border-green-500'
              : 'border-darkRed'
            : ''
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
    <div className="max-w-lg mx-auto p-8 rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-oldstyle italic font-bold text-gray-800">
          Shipping Information
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-darkRed hover:text-red-800 transition-colors"
        >
          <FaEdit className="text-xl" />
        </button>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex space-x-4">
          <div className="w-1/2">
            {renderInput('fullName', 'First Name', 'Your name')}
          </div>
          <div className="w-1/2">
            {renderInput('lastName', 'Last Name', 'Your lastname')}
          </div>
        </div>

        {renderInput('address', 'Address', 'Your address')}

        <div className="flex space-x-4">
          <div className="w-2/5">
            {renderInput('city', 'City', 'City')}
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
          <>
            <button
              type="button"
              onClick={handleSave}
              className={`w-full py-2 rounded-md transition-colors ${
                isFormValid()
                  ? 'bg-darkRed text-white hover:bg-lightRed'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!isFormValid()}
            >
              Save Changes
            </button>
            {!isFormValid() && (
              <p className="text-sm text-red-500 text-center">
                Please complete all required fields correctly
              </p>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default UserShippingInfo;
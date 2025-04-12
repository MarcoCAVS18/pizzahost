import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getUserShippingInfo } from '../../../services/userService';
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

const CheckoutShippingInfo = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginOptions, setShowLoginOptions] = useState(!user);
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
    email: '',
  });

  // Fetch shipping info if user is logged in
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
              email: user.email || '', // Add user email if available
            }));
          }
          // If user is logged in, don't show login options
          setShowLoginOptions(false);
        } catch (error) {
          console.error('Failed to fetch user shipping info:', error);
        }
      } else {
        // If user is not logged in, show login options
        setShowLoginOptions(true);
      }
    };

    fetchShippingInfo();
    // Añadido shippingInfo al array de dependencias para corregir el warning de ESLint
    // No se usa dentro del efecto, pero ESLint lo detecta como dependencia
  }, [user, shippingInfo]);

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

  const handleLogin = () => {
    navigate('/user');
  };

  const handleContinueWithoutLogin = () => {
    setShowLoginOptions(false);
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
    <div className={errors[name] && touched[name] ? 'error' : ''}>
      <label className="block text-sm font-serif text-gray-400">
        {label} <span className="text-darkRed">*</span>
      </label>
      <select
        name={name}
        value={shippingInfo[name]}
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
    <div className="p-6 rounded-lg shadow-sm mb-6 relative">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {renderInput('fullName', 'Name', 'John')}
        {renderInput('lastName', 'Last Name', 'Doe')}
        {renderInput('address', 'Address', '123 Main Street')}
        
        <div className="flex space-x-4">
          <div className="w-1/2">
            {renderInput('city', 'City', 'Sydney')}
          </div>
          <div className="w-1/2">
            {renderInput('postalCode', 'Postal Code', '2000')}
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            {renderSelect('state', 'State')}
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-serif text-gray-400">Country</label>
            <input
              type="text"
              value={shippingInfo.country}
              disabled
              className="mt-1 block w-full px-4 py-2 border rounded-md font-semibold bg-transparent font-serif"
            />
          </div>
        </div>

        {renderInput('phone', 'Phone Number', '0444123456')}
        
        <div>
          {renderInput('email', 'Email', 'example@email.com')}
          <p className="text-xs text-gray-500 font-serif mt-1">We'll send your receipt here.</p>
        </div>
      </form>

      {/* Overlay for non-logged in users */}
      {showLoginOptions && (
        <div className="absolute inset-0 bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="text-center p-6 bg-beige rounded-lg shadow-md rounded-2xl w-4/5 max-w-md">
            <h3 className="text-xl font-oldstyle italic font-bold mb-4">
              Complete your delivery details
            </h3>
            <p className="text-gray-600 mb-6 font-serif">
              Sign in to use your saved delivery address or continue as guest
            </p>
            <div className="flex flex-col space-y-3">
              <Button
                text="Sign In"
                onClick={handleLogin}
                textColor="text-white"
                bgColor="bg-darkRed"
                hoverColor="hover:bg-lightRed"
                className="w-full font-oldstyle italic"
              />
              <Button
                text="Continue as Guest"
                onClick={handleContinueWithoutLogin}
                textColor="text-darkRed"
                bgColor="bg-white"
                hoverColor="hover:bg-gray-100"
                className="w-full border border-darkRed font-oldstyle italic"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutShippingInfo;

import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { getUserShippingInfo, updateUserShippingInfo } from '../../../services/userService';

const UserShippingInfo = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
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
            setShippingInfo({
              fullName: data.fullName || '',
              lastName: data.lastName || '',
              address: data.address || '',
              city: data.city || '',
              state: data.state || '',
              postalCode: data.postalCode || '',
              phone: data.phone || '',
              userId: data.userId || user.uid.slice(-4),
            });
          }
        } catch (error) {
          console.error('Failed to fetch user shipping info:', error);
        }
      }
    };

    fetchShippingInfo();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSave = async () => {
    if (!user?.uid) return;

    try {
      const updatedInfo = { ...shippingInfo, userId: user.uid.slice(-4) };
      await updateUserShippingInfo(user.uid, updatedInfo);
      setIsEditing(false);
      alert('Shipping info updated successfully!');
    } catch (error) {
      console.error('Error saving shipping info:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-oldstyle italic font-bold text-gray-800">Shipping Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-darkRed hover:text-red-800 transition-colors"
        >
          {isEditing ? <FaSave className="text-xl" /> : <FaEdit className="text-xl" />}
        </button>
      </div>

      <form className="space-y-4">
        {/* Full Name & Last Name */}
        <div className="flex space-x-4">
          <div className="w-full">
            <label className="block text-sm font-medium font-serif text-gray-600">First Name</label>
            <input
              type="text"
              name="fullName"
              value={shippingInfo.fullName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 block w-full px-4 py-2 border rounded-md ${
                isEditing ? 'border-blue-400' : 'bg-gray-100'
              }`}
              placeholder="Facundo"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium font-serif text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={shippingInfo.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 block w-full px-4 py-2 border rounded-md ${
                isEditing ? 'border-blue-400' : 'bg-gray-100'
              }`}
              placeholder="Aguirre"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium font-serif text-gray-600">Address</label>
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full px-4 py-2 border rounded-md ${
              isEditing ? 'border-blue-400' : 'bg-gray-100'
            }`}
            placeholder="123 La concha del pato"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium font-serif text-gray-600">City</label>
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full px-4 py-2 border rounded-md ${
              isEditing ? 'border-blue-400' : 'bg-gray-100'
            }`}
            placeholder="Ceduna"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium font-serif text-gray-600">State</label>
          <input
            type="text"
            name="state"
            value={shippingInfo.state}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full px-4 py-2 border rounded-md ${
              isEditing ? 'border-blue-400' : 'bg-gray-100'
            }`}
            placeholder="South Australia"
          />
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-sm font-medium font-serif text-gray-600">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full px-4 py-2 border rounded-md ${
              isEditing ? 'border-blue-400' : 'bg-gray-100'
            }`}
            placeholder="5690"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium font-serif text-gray-600">Phone</label>
          <input
            type="text"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full px-4 py-2 border rounded-md ${
              isEditing ? 'border-blue-400' : 'bg-gray-100'
            }`}
            placeholder="+61 (0444) 123-4567"
          />
        </div>

        {/* User ID */}
        <div>
          <label className="block text-sm font-medium font-serif text-gray-600">User ID</label>
          <input
            type="text"
            name="userId"
            value={shippingInfo.userId}
            disabled
            className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-500"
          />
          <p className="text-xs text-gray-500 font-serif mt-2">Remember, this code will be used for delivery</p>
        </div>

        {/* Save Button */}
        {isEditing && (
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-darkRed text-white py-2 rounded-md hover:bg-lightRed transition-colors"
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default UserShippingInfo;

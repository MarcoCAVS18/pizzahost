// components/dashboard/RecentOrders.jsx

import React from 'react';

const RecentOrders = () => {
  const orders = [
    {
      id: '#12345',
      date: '2024-01-15',
      total: 45.99,
      status: 'Delivered'
    },
    {
      id: '#12346',
      date: '2024-01-10',
      total: 32.50,
      status: 'In Progress'
    },
  ];

  return (
    <div className=" rounded-lg shadow-md p-6">
      <h2 className="font-serif italic text-2xl mb-6">Recent Orders</h2>
      
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div 
              key={order.id}
              className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-oldstyle text-lg">{order.id}</p>
                  <p className="text-gray-600 text-sm">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-oldstyle">${order.total}</p>
                  <p className={`text-sm ${
                    order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {order.status}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center font-oldstyle">
            No orders yet
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;
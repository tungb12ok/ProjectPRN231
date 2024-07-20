import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../api/apiOrder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderIds, setExpandedOrderIds] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await getUserOrders(token);
          setOrders(data.$values || []);
        }
      } catch (error) {
        toast.error('Error fetching orders');
      }
    };

    fetchOrders();
  }, []);

  const toggleExpandOrder = (orderId) => {
    setExpandedOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <div className="container mx-auto px-5 py-5">
      <ToastContainer />
      <h1 className="font-bold text-2xl mb-5">My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div key={order.orderId} className="border rounded-lg p-4 shadow-lg">
              <h2 className="font-bold text-lg mb-2">Order #{order.orderId}</h2>
              <p className="mb-2">Total Price: {order.totalPrice} VND</p>
              <p className="mb-2">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p className="mb-2">Status: {order.status}</p>
              <button
                onClick={() => toggleExpandOrder(order.orderId)}
                className="text-blue-500"
              >
                {expandedOrderIds.includes(order.orderId) ? 'Hide Details' : 'View Details'}
              </button>
              {expandedOrderIds.includes(order.orderId) && (
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {order.products.$values.map((product) => (
                    <div key={product.productId} className="border rounded-lg p-4 flex">
                      <img
                        src={product.mainImagePath}
                        alt={product.mainImageName}
                        className="w-24 h-24 object-cover mr-4"
                      />
                      <div className="flex flex-col justify-between">
                        <h3 className="font-bold">{product.productName}</h3>
                        <p>Quantity: {product.quantity}</p>
                        <p>Size: {product.size}</p>
                        <p>Color: {product.color}</p>
                        <p>Description: {product.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;

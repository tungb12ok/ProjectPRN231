import React from "react";
import { useParams } from "react-router-dom";

const OrderFailurePage = () => {
  const { orderId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-2xl font-bold mb-4">Payment Failed</h1>
      <p className="text-gray-700 mb-2">Order ID: {orderId}</p>
      <p className="text-gray-700">Please try again.</p>
    </div>
  );
};

export default OrderFailurePage;

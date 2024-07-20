import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <div className="bg-white shadow-lg rounded-lg p-10 w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <h1 className="text-4xl font-bold mb-6 text-center text-green-700">Payment Successful!</h1>
        <p className="text-gray-700 text-center mb-4 text-xl">Order ID: <span className="font-bold">{orderId}</span></p>
        <p className="text-gray-700 mb-6 text-center text-lg">Thank you for your purchase. Your order has been placed successfully.</p>
        <div className="flex justify-center">
          <Button 
            className="text-white bg-green-500 hover:bg-green-600 font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out" 
            onClick={handleBackToHome}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;

import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkPaymentStatus } from "../api/apiPayment"; 

const PaymentPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes countdown
  const [qrLink, setQrLink] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const qrLinkParam = params.get("qrLink");
    setQrLink(qrLinkParam);

    // Countdown timer logic
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          checkOrderStatus();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Check payment status every 15 seconds
    const checkStatusInterval = setInterval(() => {
      checkOrderStatus();
    }, 15000);

    // Redirect to order failure after 10 minutes
    const timeout = setTimeout(() => {
      navigate(`/order-failure/${orderId}`);
    }, 600000);

    return () => {
      clearInterval(interval);
      clearInterval(checkStatusInterval);
      clearTimeout(timeout);
    };
  }, [location.search]);

  const checkOrderStatus = async () => {
    try {
      const response = await checkPaymentStatus(orderId);
      if (response.status === 200) {
        toast.success(response.data.message);
        console.log("Order status:", response.data.message);
        // Redirect to a success page or order summary
        navigate(`/order-success/${orderId}`);
      }
    } catch (error) {
      console.error("Error checking order status", error);
      console.log("Order ID:", orderId);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10 w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">Processing Payment</h1>
        <p className="text-gray-700 text-center mb-4 text-xl">Order ID: <span className="font-bold">{orderId}</span></p>
        <div className="text-6xl font-bold text-blue-600 mb-6 text-center">
          {Math.floor(timeLeft / 60).toString().padStart(2, "0")}:{(timeLeft % 60).toString().padStart(2, "0")}
        </div>
        <p className="text-gray-700 mb-6 text-center text-lg">Please scan the QR code below to complete the payment within the time limit.</p>
        <div className="flex justify-center mb-6">
          <img src={qrLink} alt="QR Code" className="w-72 h-72" />
        </div>
        <p className="text-gray-700 text-center text-lg">Payment link: 
          <a href={qrLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline ml-2">Open QR Code</a>
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;

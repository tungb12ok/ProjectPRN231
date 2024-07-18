import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import DeliveryAddress from "../components/Payment/DeliveryAddress";
import PaymentMethod from "../components/Payment/PaymentMethod";
import OrderSuccess from "../components/Payment/OrderSuccess";
import { checkout } from "../services/paymentServices";
import { useSelector } from "react-redux";
import { selectedShipment } from "../redux/slices/shipmentSlice";

const Checkout = () => {
  const location = useLocation();
  const shipment = useSelector(selectedShipment);
  const { selectedProducts } = location.state || { selectedProducts: [] };
  const [distance, setDistance] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderCode] = useState("123456");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const totalPrice = selectedProducts.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const orderMethodId = selectedOption;

      const data = {
        transportFee: transportFee,
        receivedDate: new Date().toISOString(),
        orderDetails: selectedProducts.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        shipmentDetailId: shipment.id,
      };

      const response = await checkout(token, orderMethodId, data);

      if (orderMethodId === "1") {
        setOrderSuccess(true);
      } else if (orderMethodId === "2" && response.data.paymentLink) {
        window.open(response.data.paymentLink, "_blank");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const calculateTransportFee = (distance) => {
    if (distance < 5) {
      return 0;
    } else if (totalPrice >= 200000) {
      return 0;
    } else if (distance <= 10) {
      return 15000;
    } else {
      return 15000 + Math.ceil((distance - 10) / 5) * 5000;
    }
  };

  const transportFee = 30000;
    // distance !== null ? calculateTransportFee(distance) : "Calculating...";

  if (orderSuccess) {
    return <OrderSuccess orderCode={orderCode} />;
  }

  return (
    <div className="px-5 py-5 flex flex-row bg-slate-200">
      <div className="text-nowrap basis-2/3 bg-white mx-2 pr-14">
        <DeliveryAddress
          userData={userData}
          setUserData={setUserData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setDistance={setDistance}
        />
        <PaymentMethod
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />
      </div>
      <div className="basis-3/5 mx-2 h-1/4">
        <div className="font-rubikmonoone text-center p-5 border rounded text-black">
          Order Summary
        </div>
        {selectedProducts.length === 0 ? (
          <div className="flex justify-center items-center py-4 text-center">
            <p className="text-lg text-black">
              No items selected for checkout.
            </p>
          </div>
        ) : (
          <div className="overflow-auto h-3/4">
            <div className="grid grid-cols-1 gap-4">
              {selectedProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex border rounded p-4 space-x-2"
                >
                  <div className="relative">
                    <img
                      src={item.mainImagePath}
                      alt={item.mainImageName}
                      className="w-auto h-32 object-cover rounded"
                    />
                    <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col space-y-4">
                      <h3 className="text-lg font-semibold w-60">
                        {item.productName}
                      </h3>
                    </div>
                    <p className="text-lg text-black">{item.totalPrice} VND</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-px bg-gray-300 my-5 mx-auto font-bold"></div>
            <div className="flex justify-between items-center pt-1 border rounded mt-4">
              <h3 className="text-lg font-semibold">Subtotal</h3>
              <p className="text-lg text-black">{totalPrice} VND</p>
            </div>
            <div className="flex justify-between items-center pt-1 border rounded mt-4">
              <h3 className="text-lg font-semibold">Transport Fee</h3>
              <p className="text-lg text-black">
                {transportFee === "Calculating..."
                  ? transportFee
                  : `${transportFee} VND`}
              </p>
            </div>
            <div className="flex justify-between items-center pt-1 border rounded mt-4">
              <h3 className="text-lg font-semibold">Total</h3>
              <p className="text-lg text-black">
                {totalPrice +
                  (transportFee === "Calculating..." ? 0 : transportFee)}{" "}
                VND
              </p>
            </div>
          </div>
        )}
        <div className="flex justify-center items-center">
          <Button
            className="text-white bg-orange-500 w-40 py-3 rounded"
            onClick={handleCheckout}
          >
            Complete order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

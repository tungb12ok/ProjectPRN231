import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getUserCart } from '../services/cartService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserCart = ({ sortBy }) => {
  const [cartData, setCartData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const cartData = await getUserCart(sortBy, token);
          setCartData(cartData);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    getCart();
  }, [sortBy]);

  const handleRemoveFromCart = (productId) => {
    // Implement remove from cart logic
  };

  const handleQuantityChange = (product, change) => {
    // Implement quantity change logic
  };

  const handleSelectItem = (productId) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(productId)
        ? prevSelected.filter(id => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartData.map(item => item.id));
    }
  };

  const totalItems = cartData.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = selectedItems.reduce((acc, id) => {
    const item = cartData.find(item => item.id === id);
    return acc + item.totalPrice;
  }, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item to checkout.");
      return;
    }

    const selectedProducts = cartData.filter(item => selectedItems.includes(item.id));
    navigate('/checkout', { state: { selectedProducts } });
  };

  return (
    <div className="container mx-auto px-20 py-5">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-rubikmonoone text-orange-500 text-2xl">Shopping Cart</h1>
        <span className="font-rubikmonoone text-orange-500 text-xl">{totalItems} Items</span>
      </div>
      {cartData.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="w-full">
          <div className="bg-zinc-100 rounded-lg overflow-hidden shadow-lg">
            <div className="flex items-center justify-between p-4 bg-zinc-300">
              <div className="w-1/12 text-center">
                <input
                  type="checkbox"
                  checked={selectedItems.length === cartData.length}
                  onChange={handleSelectAll}
                />
              </div>
              <div className="w-5/12 text-center font-poppins text-lg font-bold">Products</div>
              <div className="w-2/12 text-center font-poppins text-lg font-bold">Quantity</div>
              <div className="w-1/12 text-center font-poppins text-lg font-bold">Price</div>
              <div className="w-2/12 text-center font-poppins text-lg font-bold">Total</div>
              <div className="w-1/12 text-center font-poppins text-lg font-bold">Action</div>
            </div>
            {cartData.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 border-b hover:bg-zinc-200">
                <div className="w-1/12 text-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </div>
                <div className="w-5/12 flex items-center">
                  <img src={item.mainImagePath} alt={item.mainImageName} className="w-16 h-16 object-cover mr-4" />
                  <Link to={`/product/${item.productId}`} className="text-sm font-poppins font-bold text-wrap w-1/2">
                    {item.productName}
                  </Link>
                </div>
                <div className="w-2/12 text-center flex items-center justify-center">
                  <button
                    className="px-2 py-1 border"
                    onClick={() => handleQuantityChange(item, 'decrease')}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="px-2 py-1 border"
                    onClick={() => handleQuantityChange(item, 'increase')}
                  >
                    +
                  </button>
                </div>
                <div className="w-1/12 text-center">{item.totalPrice / item.quantity} VND</div>
                <div className="w-2/12 text-center">{item.totalPrice} VND</div>
                <div className="w-1/12 text-center">
                  <button
                    className="text-red-500"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <Link to="/product" className="text-blue-500 flex items-center font-poppins">
              <FontAwesomeIcon className="pr-2" icon={faArrowLeft} /> Continue Shopping
            </Link>
            <div className="text-right">
              <p className="text-lg font-semibold">Total ({selectedItems.length} items): {totalPrice} VND</p>
              <button
                className="bg-orange-500 text-white px-4 py-2 mt-2"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCart;

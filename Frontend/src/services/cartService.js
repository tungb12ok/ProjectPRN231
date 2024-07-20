// cartService.js
import { addToCartAPI, getCartAPI, deleteMyCart, updateCartItemQuantityAPI } from '../api/apiCart';
import { toast } from "react-toastify";

export const addToCart = async (productId, quantity, token) => {
  // console.log(quantity, token, productId);
  try {
    const response = await addToCartAPI(productId, quantity, token);
    toast.success("Product added to cart successfully");
    return response.data;
  } catch (error) {
    console.error('Add to cart failed', error);
    toast.error("Add to cart failed: " + error.message);
    throw error;
  }
};

export const getUserCart = async (sortBy = '', token) => {
  try {
    const response = await getCartAPI(sortBy, token);
    return response.data.data.$values;
  } catch (error) {
    console.error('Error fetching cart:', error);
    toast.error('Error fetching cart');
    throw error;
  }
};
export const deleteToCart = async (id, token) => {
  try {
    const response = await deleteMyCart(id, token);
    return response.data;
  } catch (error) {
    console.error('Remove from cart failed', error);
    toast.error("Remove from cart failed: " + error.message);
    throw error;
  }
};
export const updateCartService = async (productId, quantity, token) => {
  try {
    const response = await updateCartItemQuantityAPI(productId, quantity, token);
    return response.data;
  } catch (error) {
    console.error('update from cart failed', error);
    toast.error("update from cart failed: " + error.message);
    throw error;
  }
};
export const createOrder = async (orderItems, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/Order/create-order`, {
      orderItems
    }, {
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    toast.success("Order created successfully");
    return response.data;
  } catch (error) {
    console.error('Create order failed', error);
    toast.error("Create order failed: " + error.message);
    throw error;
  }
};

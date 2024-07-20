import axios from 'axios';
import { BASE_URL } from '../config';

export const getUserOrders = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/User/MyOrder`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': '*/*'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

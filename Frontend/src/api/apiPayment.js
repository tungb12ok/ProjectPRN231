import axios from 'axios';
import { BASE_URL } from '../config';

const API_BASE_URL = `${BASE_URL}/api/Payment`;

export const checkoutOrder = (token, orderMethodId, data) => {
  return axios.post(`${API_BASE_URL}/checkout-orders?orderMethodId=${orderMethodId}`, data, {
    headers: {
      'Accept': '*/*',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};
export const checkPaymentStatus = (orderId) => {
  return axios.get(`${BASE_URL}/api/mbbank/checkAmountAndUpdateOrder/${orderId}`, {
    headers: {
      'Accept': '*/*',
    }
  });
};
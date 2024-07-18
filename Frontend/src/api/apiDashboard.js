import axios from 'axios';
import { BASE_URL } from '../config';

const API_BASE_URL = `${BASE_URL}/api/Order`;

export const fetchOrdersAPI = () => {
  return axios.get(`${API_BASE_URL}/get-all-orders`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

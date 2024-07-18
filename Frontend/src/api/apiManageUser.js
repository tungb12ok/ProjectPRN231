import axios from 'axios';
import { BASE_URL } from '../config';

const API_BASE_URL = `${BASE_URL}/api/User/get-all-users`;

export const fetchAllUsers = async (token) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.$values;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
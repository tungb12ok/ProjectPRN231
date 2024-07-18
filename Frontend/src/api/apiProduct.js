import axios from 'axios';
import { BASE_URL } from '../config';

const API_BASE_URL = `${BASE_URL}/api/Product`;

export const getProductList = (sortBy = '') => {
  const url = `${API_BASE_URL}/list-products`;
  const params = {};
  if (sortBy) {
    params.sortBy = sortBy;
  } else {
    params.sortBy = '""'; 
  }
  return axios.get(url, {
    params,
    headers: {
      'accept': '*/*'
    }
  });
};

export const getProductListPagination = ({ page = 1, perPage = 10, sortBy = '', isAscending = true }) => {
  const url = `${API_BASE_URL}/list-products`;
  const params = { page, perPage, sortBy, isAscending };
  return axios.get(url, {
    params,
    headers: {
      'accept': '*/*'
    }
  });
};


export const getProductById = (id) => {
  const url = `${API_BASE_URL}/get-product/${id}`;
  return axios.get(url, {
    headers: {
      'accept': '*/*'
    }
  });
};

export const getProductSortBy = (sortBy = '') => {
  const url = `${API_BASE_URL}/filter-sort-products`;
  const params = { sortBy, perPage: 10, currentPage: 0, isAscending: true };
  return axios.get(url, {
    params,
    headers: {
      'accept': '*/*'
    }
  });
};

export const deleteProductById = (id) => {
  const url = `${API_BASE_URL}/delete-product/${id}`;
  return axios.delete(url, {
    headers: {
      'accept': '*/*'
    }
  });
};

export const addProduct = (product) => {
  const url = `${API_BASE_URL}/add-product`;
  return axios.post(url, product, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
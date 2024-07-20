import axios from "axios";
import { BASE_URL } from "../config";

const API_BASE_URL = `${BASE_URL}/api/Product`;

export const getProductList = (sortBy = "") => {
  const url = `${API_BASE_URL}/list-products`;
  const params = {};
  return axios.get(url, {
    params,
    headers: {
      accept: "*/*",
    },
  });
};
export const getProductListPage = (currentPage = 1, perPage = 8, sortBy = "", isAscending = true) => {
  sortBy = "id";
  const url = `${API_BASE_URL}/list-products`;
  const params = { currentPage, perPage, sortBy, isAscending};
  return axios.get(url, {
    params,
    headers: {
      accept: "*/*",
    },
  });
};
export const getProductListPagination = ({
  currentPage = 1,
  perPage = 5,
  sortBy = "",
  isAscending = true,
}) => {
  const url = `${API_BASE_URL}/list-products`;
  const params = { currentPage, perPage, isAscending };
  console.log("params: ", params); // Debugging line to check the params
  console.log("log API URL", url);
  return axios.get(url, {
    params,
    headers: {
      accept: "*/*",
    },
  });
};
export const getProductListPaginationAdmin = ({
  currentPage = 1,
  perPage = 5,
  sortBy = "",
  isAscending = true,
  keywords = ""
}) => {
  const url = `${API_BASE_URL}/SearchProductsByAdmin`;
  const params = { currentPage, perPage, isAscending, keywords };
  console.log("params: ", params); 
  console.log("log API URL", url);
  return axios.get(url, {
    params,
    headers: {
      accept: "*/*",
    },
  });
};

export const getProductById = (id) => {
  const url = `${API_BASE_URL}/get-product/${id}`;
  return axios.get(url, {
    headers: {
      accept: "*/*",
    },
  });
};

export const getProductSortBy = (sortBy = "") => {
  const url = `${API_BASE_URL}/filter-sort-products`;
  const params = { sortBy, perPage: 10, currentPage: 0, isAscending: true };
  return axios.get(url, {
    params,
    headers: {
      accept: "*/*",
    },
  });
};

export const deleteProductById = (id) => {
  const url = `${API_BASE_URL}/delete-product/${id}`;
  return axios.delete(url, {
    headers: {
      accept: "*/*",
    },
  });
};

export const addProduct = async (product, token) => {
  const url = `${API_BASE_URL}/add-product-list`;
  return axios.post(url, product, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProductStatus = async (id,status,token) => {
  const url = `${API_BASE_URL}/update-product-status?id=${id}&status=${status}`;
  return axios.post(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateProduct = async (product, token) => {
  console.log("product: ", product);
  const url = `${API_BASE_URL}/update-product/${product.id}`;
  return axios.put(url, product, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

// Fetch list of sports
export const getSportList = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/sport/list-sports`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    });
    return response.data.data.$values;
  } catch (error) {
    console.error("Error fetching sports:", error);
    throw error;
  }
};

// Fetch list of categories
export const getCategoryList = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/Category/list-categories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      }
    );
    return response.data.data.$values;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Fetch list of brands
export const getBrandList = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Brand/list-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    });
    return response.data.data.$values;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

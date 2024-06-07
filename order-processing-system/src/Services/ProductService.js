import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const createProduct = async (product) => {
  return await axios.post(API_URL, product);
};

export const getProducts = async () => {
  return await axios.get(API_URL);
};

export const getProduct = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const updateProduct = async (id, product) => {
  return await axios.patch(`${API_URL}/${id}`, product);
};

export const deleteProduct = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

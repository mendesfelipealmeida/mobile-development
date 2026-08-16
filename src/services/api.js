import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

export async function getProductsByCategory(category) {
  const response = await api.get(`/products/category/${category}`);
  return response.data.products ?? [];
}

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

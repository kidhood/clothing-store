import { apiClient } from "./ApiClient";

export const retrieveProducts = () => apiClient.get('products')

export const retrieveProductById = (id) => apiClient.get(`products/${id}`)

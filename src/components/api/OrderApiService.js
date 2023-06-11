import { apiClient } from "./ApiClient";

export const checkOut = (carts) => apiClient.post('/users/checkout', carts)
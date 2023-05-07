import { apiClient } from "./ApiClient";

export const retrieveSizes = () => apiClient.get('sizes')
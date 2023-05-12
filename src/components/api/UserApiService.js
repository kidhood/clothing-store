import { apiClient } from "./ApiClient";

export const registerUser = (userAccount) => apiClient.post(`/register`,userAccount)

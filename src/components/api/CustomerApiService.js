import { apiClient } from "./ApiClient";

export const retrieveCusByUserName = (account) => apiClient.post(`/users/retrieve-customer`,account)

export const updateCusProfile = (customer) => apiClient.post(`users/update-profile`,customer)
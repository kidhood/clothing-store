import { apiClient } from "./ApiClient";

export const executeBasicAuthenticationService = (token) => apiClient.get(`/basicauth`,{
    headers:{
        Authorization:token
    }
})

export const executeJwtAuthenticationService = (email,password) => apiClient.post(`/api/v1/users/authenticate`,{email,password})
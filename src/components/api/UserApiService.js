import { apiClient } from "./ApiClient";

export const registerUser = (userAccount) => apiClient.post(`/register`,userAccount)

export const changePasswordUser = (passwordModel) => apiClient.post('/users/changepassword',passwordModel )

export const GOOGLE_AUTH_URL = (redirect_uri) => apiClient.get(`/oauth2/authorize/google?redirect_uri=${redirect_uri}`)

export const GET_USER_BY_TOKEN = (token) => apiClient.post('/users/username',{token})
import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true, // Set withCredentials to true
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });
import axios from "axios";
import { useAuth } from "../context/authContext";

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const Axios_Instance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000",
  baseURL:"http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});


// Interceptor for adding headers dynamically (currently without token logic)
Axios_Instance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("authToken");
    console.log("token front end:",token);
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default Axios_Instance;

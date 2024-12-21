import axios from "axios";

const Axios_Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios_Instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

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

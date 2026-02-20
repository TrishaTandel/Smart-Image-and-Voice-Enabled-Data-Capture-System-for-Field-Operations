import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    toast.error(error.response?.data?.detail || "Server Error");
    return Promise.reject(error);
  }
);

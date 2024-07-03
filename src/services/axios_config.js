import axios from "axios";
import { getToken, setToken } from "../utils/token_utils";

const baseURL = import.meta.env.VITE_SERVER_BASE_URL;
export const axios_instance = axios.create({
   baseURL: baseURL
});

axios_instance.interceptors.request.use(
   async (config) => {
      const token = getToken();
      if (token) {
         config.headers['auth_token'] = token; // Không cần 'Bearer '
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);
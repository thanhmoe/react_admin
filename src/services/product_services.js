import { axios_instance } from "./axios_config";

const API_PATH = "/products";

export const fetchProduct = async () => {
   try {
      const response = await axios_instance.get(`${API_PATH}/`);
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const addProduct = async (productData) => {
   try {
      const response = await axios_instance.post(`${API_PATH}/add`, productData);
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};


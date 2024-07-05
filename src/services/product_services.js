import { axios_instance } from "./axios_config";

const API_PATH = "/products";

export const fetchProductDetail = async (id) => {
   try {
      const response = await axios_instance.get(`${API_PATH}/${id}/admin`);
      if (response && response.status === 200)
         return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const fetchProducts = async (params) => {
   const { page, limit, textQuery, sortBy, sortOrder, category, isActive } = params;
   console.log(params);
   try {
      let URL = `${API_PATH}/admin/?page=${page}&limit=${limit}`;
      if (textQuery) URL += `&textQuery=${textQuery}`;
      if (category) URL += `&category=${category}`;
      if (sortBy) URL += `&sortBy=${sortBy}`;
      if (sortOrder) URL += `&sortOrder=${sortOrder}`;
      if (isActive === 0 || isActive === 1) URL += `&isActive=${isActive}`;
      const response = await axios_instance.get(URL);
      if (response && response.status === 200)
         return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const addProduct = async (productData) => {
   try {
      const response = await axios_instance.post(
         `${API_PATH}/add`,
         productData,
         {
            headers: {
               "Content-Type": "multipart/form-data"
            }
         }
      );
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};


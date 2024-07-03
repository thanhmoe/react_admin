import { axios_instance } from "../services/axios_config";

export const fetchCategory = async () => {
   try {
      const response = await axios_instance.get("/categories");
      if (response && response.status === 200)
         return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const addCategory = async (categoryData) => {
   try {
      const response = await axios_instance.post("/categories/add", categoryData);
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

//updateCategory
export const updateCategory = async (id, updatedCategory) => {
   try {
      const response = await axios_instance.put(`/categories/update/${id}`, updatedCategory);
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};
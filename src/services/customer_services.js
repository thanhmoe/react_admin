import { axios_instance } from "../services/axios_config";

export const fetchCustomers = async () => {
   try {
      const response = await axios_instance.get("/customers");
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const updateCustomer = async () => {
   try {
      const response = await axios_instance.get("/customers");
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};
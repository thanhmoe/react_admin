import { axios_instance } from "../services/axios_config";

const API_PATH = "/staffs";
export const loginStaff = async (user) => {
   try {
      const response = await axios_instance.post(`${API_PATH}/login`, user);
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const logOutStaff = async () => {
   try {
      const response = await axios_instance.get(`${API_PATH}/logout`);
      if (response.success) {

      }
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};
import { axios_instance } from "../services/axios_config";

const API_PATH = `/customers`


export const fetchCustomers = async () => {
   try {
      const response = await axios_instance.get(API_PATH);
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const updateCustomer = async () => {
   try {
      const response = await axios_instance.get(API_PATH);
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const getCustomerLoginTraffic = async(params) =>{
   const {page, limit,startDate,endDate,sortBy, sortOrder} = params
	try {
      const url = `${API_PATH}/loginTraffic?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
		const response = await axios_instance.get(url);
      return response.data
	} catch (error) {
		return error.response.data;
	}
}

export const getCustomerRegistrationTraffic = async(params) =>{
   const {page, limit,startDate,endDate,sortBy, sortOrder} = params
	try {
      const url = `${API_PATH}/registration-traffic?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
		const response = await axios_instance.get(url);
      return response.data
	} catch (error) {
		return error.response.data;
	}
}
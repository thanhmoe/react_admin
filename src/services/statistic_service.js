import { axios_instance,axios_response_handler } from "./axios_config";

const API_CUSTOMER = '/customers';
const API_ORDERS = '/orders/statistic';
const API_PRODUCTS = '/products/statistic';


export const getTotalusers = async () => {
	try {
		const response = await axios_instance.get(`${API_CUSTOMER}/total-user`);
		return axios_response_handler(response)
	} catch (error) {
		return error.response.data;
	}
}

export const getTotalProducts = async () => {
	try {
		const response = await axios_instance.get(`${API_PRODUCTS}/total-products`);
		return axios_response_handler(response)
	} catch (error) {
		return error.response.data;
	}
}

export const getTotalSales = async () => {
	try {
		const response = await axios_instance.get(`${API_ORDERS}/total-sales`);
		return axios_response_handler(response)
	} catch (error) {
		return error.response.data;
	}
}

export const getTotalRevenue = async (params) => {
    const { startDate, endDate} = params;
	try {
		const url = `${API_ORDERS}/total-revenue?startDate=${startDate}&endDate=${endDate}`;
		const response = await axios_instance.get(url);
		return axios_response_handler(response)
	} catch (error) {
		return error.response.data;
	}
}
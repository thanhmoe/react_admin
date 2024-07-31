import { all } from "axios";
import { axios_instance, axios_response_handler } from "./axios_config";

const API_PATH = "/orders";
const API_SUFFIX = "staffs";
const ALLOWED_SORT_STATUSES = ["pending", "processing", "cancelled", "delivered", "shipping"]

export const fetchOrders = async (params) => {
	const { page, limit, textQuery } = params;
	let { sortStatus } = params;
	try {
		sortStatus = (sortStatus === "all") ? null : sortStatus
		let URL = `${API_PATH}/${API_SUFFIX}/?page=${page}&limit=${limit}`;
		if (sortStatus !== "all" && ALLOWED_SORT_STATUSES.includes(sortStatus))
			URL += `&sortStatus=${sortStatus}`
		if (textQuery)
			URL += `&textQuery=${textQuery}`
		const response = await axios_instance.get(URL);
		return axios_response_handler(response);
	} catch (error) {
		return error.response.data;
	}
};

export const fetchOrderDetails = async (id) => {
	try {
		const URL = `${API_PATH}/${id}/${API_SUFFIX}`;
		const response = await axios_instance.get(URL);
		return axios_response_handler(response);
	} catch (error) {
		return error.response.data;
	}
};

export const updateOrderStatus = async (id, newStatus) => {
	try {
		const URL = `${API_PATH}/update/${id}/?newStatus=${newStatus}`;
		const response = await axios_instance.patch(URL);
		return axios_response_handler(response);
	} catch (error) {
		return error.response.data;
	}
};

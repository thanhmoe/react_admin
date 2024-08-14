import axios from "axios";
import { axios_instance, axios_response_handler } from "./axios_config";

const API_PATH = "/products";

export const fetchProductDetail = async (id) => {
	try {
		const response = await axios_instance.get(`${API_PATH}/${id}/admin`);
		return axios_response_handler(response);
	} catch (error) {
		return error.response.data;
	}
};

export const fetchProducts = async (params) => {
	const { page, limit, textQuery, sortBy, sortOrder, category, isActive } =
		params;
	try {
		let URL = `${API_PATH}/admin/?page=${page}&limit=${limit}`;
		if (textQuery) URL += `&textQuery=${textQuery}`;
		if (category) URL += `&category=${category}`;
		if (sortBy) URL += `&sortBy=${sortBy}`;
		if (sortOrder) URL += `&sortOrder=${sortOrder}`;
		if (isActive === 0 || isActive === 1) URL += `&isActive=${isActive}`;
		const response = await axios_instance.get(URL);
		return axios_response_handler(response);
	} catch (error) {
		return error.response.data;
	}
};

export const addProduct = async (data) => {
	try {
		const response = await axios_instance.post(`${API_PATH}/add`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return axios_response_handler(response);
	} catch (error) {
		return error.response.data;
	}
};

export const updateProduct = async (id, data) => {
	try {
		data.quantity_in_stock = data.quantity;
		delete data.quantity;
		const response = await axios_instance.put(
			`${API_PATH}/update/${id}`,
			data,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return axios_response_handler(response);
	} catch (error) {
		return error.response.data;
	}
};

export const disableProduct = async (id) => {
	try {
		const response = await axios_instance.put(`${API_PATH}/disable/${id}`);
		return axios_response_handler(response);
	} catch (error) {
		return error.response.data;
	}
};

export const enableProduct = async (id) => {
	try {
		const response = await axios_instance.put(`${API_PATH}/enable/${id}`);
		return axios_response_handler(response);
	} catch (error) {
		return error.response.data;
	}
};

export const getTopSellingProductsForAdmin = async (params) => {
    const { startDate, endDate, page, limit } = params;
	try {
		const url = `${API_PATH}/admin/top-selling/list?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`;
        const response = await axios_instance.get(url);
        return response.data
	} catch (error) {
		return error.response.data;
	}   
};
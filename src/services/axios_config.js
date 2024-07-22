import axios from "axios";
import { getUserData } from "../utils/user_data_utils";

const baseURL = import.meta.env.VITE_SERVER_BASE_URL;
export const axios_instance = axios.create({
	baseURL: baseURL,
});

/**
 * This function automatically attach authorized token into request header
 */
axios_instance.interceptors.request.use(
	async (config) => {
		const user = getUserData();
		if (user && user.auth_token) {
			config.headers["auth_token"] = user.auth_token; // Không cần 'Bearer '
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

/**
 * The function handle response result sent from server
 * @param {AxiosResponse} response - The response result of request
 * @returns The data sent back from server or error message if request failed
 */
export const axios_response_handler = (response) => {
	if (response) {
		switch (response.status) {
			case 200:
			case 201:
			case 400:
			case 404:
			case 500:
				return response.data;
			default:
				return response.data;
		}
	}
};

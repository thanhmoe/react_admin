import { axios_instance, axios_response_handler } from "../services/axios_config";
import { clearUserData } from "../utils/user_data_utils";

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
			clearUserData();
		}
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const requestRecoverPassword = async (data) => {
	try {
		const response = await axios_instance.post(`${API_PATH}/recover-password/request`, data);
		return axios_response_handler(response)
	} catch (error) {
		return error.response.data;
	}
};

export const sendVerifyOTP = async (data) => {
	try {
		const response = await axios_instance.post(`${API_PATH}/recover-password/verify-otp`, data);
		return axios_response_handler(response)
	} catch (error) {
		return error.response.data;
	}
};

export const resetPassword = async (data) => {
	try {
		const response = await axios_instance.patch(`${API_PATH}/recover-password/reset`, data);
		return axios_response_handler(response)
	} catch (error) {
		return error.response.data;
	}
};

export const updatePassword = async (data) => {
	try {
		const response = await axios_instance.patch(`${API_PATH}/update-password`, data);
		return axios_response_handler(response)
	} catch (error) {
		return error.response.data;
	}
}
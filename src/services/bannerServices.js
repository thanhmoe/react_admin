import { axios_instance,axios_response_handler } from "./axios_config";

const API_PATH = "/banners"

export const fetchBanners = async (params) => {
    const { page, limit,sortBy, sortOrder } =
		params;
    try {
        let URL = `${API_PATH}/?page=${page}&limit=${limit}`;
		if (sortBy) URL += `&sortBy=${sortBy}`;
		if (sortOrder) URL += `&sortOrder=${sortOrder}`;
        const response = await axios_instance.get(URL)
        return axios_response_handler(response)
    } catch (error) {
        return error.response.data
    }
}

export const deleteBanner = async (id) => {
    try {
        
        const response = await axios_instance.delete(`${API_PATH}/delete/${id}`);
        return axios_response_handler(response);
    } catch (error) {
        return error.response.data
        
    }
};
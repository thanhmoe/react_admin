import axios from "axios";
import { getToken, setToken } from "./auth";

const baseURL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
    baseURL: baseURL
});


// Add a request interceptor to include the token in every request
// instance.interceptors.request.use(
//     async (config) => {
//         const token = await getToken();
//         if (token) {
//             config.headers['auth_token'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

instance.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if (token) {
            config.headers['auth_token'] = token; // Không cần 'Bearer '
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const loginStaff = async (user) => {
    try {
        const response = await instance.post("/staffs/login", user);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};


export const logOutStaff = async () => {
    try {
        const response = await instance.get("/staffs/logout");
        if (response.success) {
            
        }
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const fetchCustomers = async () => {
    try {
        const response = await instance.get("/customers");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateCustomer = async () => {
    try {
        const response = await instance.get("/customers");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const fetchCategory = async () => {
    try {
        const response = await instance.get("/categories");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const addCategory = async (categoryData) => {
    try {
        const response = await instance.post("/categories/add", categoryData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

//updateCategory
export const updateCategory = async (id, updatedCategory) => {
    try {
        const response = await instance.put(`/categories/update/${id}`, updatedCategory);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
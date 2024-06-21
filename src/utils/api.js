import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
    baseURL: baseURL
});

export const loginStaff = async (user) => {
    try {
        const response = await instance.post("/staffs/login", user);
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
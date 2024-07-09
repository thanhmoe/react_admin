import { axios_instance, axios_response_handler } from "../services/axios_config"

const API_PATH = "/categories"

export const fetchCategories = async (params) => {
   const { page, limit, textQuery, sortBy, sortOrder, isActive } = params
   try {
      let URL = `${API_PATH}/admin/?page=${page}&limit=${limit}`
      if (textQuery) URL += `&textQuery=${textQuery}`
      if (sortBy) URL += `&sortBy=${sortBy}`
      if (sortOrder) URL += `&sortOrder=${sortOrder}`
      if (isActive === 0 || isActive === 1) URL += `&isActive=${isActive}`
      const response = await axios_instance.get(URL)
      return axios_response_handler(response)
   } catch (error) {
      return error.response.data
   }
}

export const addCategory = async (data) => {
   try {
      const response = await axios_instance.post("/categories/add", data)
      return axios_response_handler(response)
   } catch (error) {
      return error.response.data
   }
}

//updateCategory
export const updateCategory = async (id, data) => {
   try {
      const response = await axios_instance.put(`/categories/update/${id}`, data)
      return response.data
   } catch (error) {
      return error.response.data
   }
}
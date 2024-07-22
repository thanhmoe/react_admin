export const getToken = () => localStorage.getItem('auth_token')
const setToken = (token) => localStorage.setItem('auth_token', token)
export const clearToken = () => localStorage.removeItem('auth_token')

const getUserRole = () => localStorage.getItem("user_role")
const setUserRole = (role) => localStorage.setItem("user_role", role)
const clearUserRole = () => localStorage.removeItem('user_role')


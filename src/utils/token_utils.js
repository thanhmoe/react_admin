export const getToken = () => {
    return localStorage.getItem('auth_token');
};

export const setToken = (token) => {
    localStorage.setItem('auth_token', token);
};

export const clearToken = () => {
    localStorage.removeItem('auth_token');
};

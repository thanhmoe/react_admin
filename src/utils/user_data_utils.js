const USER_DATA_KEY = "user_data";
export const setUserData = (user_data) =>
	localStorage.setItem(USER_DATA_KEY, JSON.stringify(user_data));

export const getUserData = () => {
	const userData = localStorage.getItem(USER_DATA_KEY);
	return JSON.parse(userData);
};

export const clearUserData = () => {
	localStorage.removeItem(USER_DATA_KEY);
};

import { createContext, useContext, useEffect, useState } from "react";
import {
	clearUserData,
	getUserData,
	setUserData,
} from "../utils/user_data_utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const storedUser = getUserData();
		if (storedUser) setUser(storedUser);
	}, []);

	const login = (userData) => {
		setUserData(userData);
		setUser(userData);
	};
	const logout = () => {
		clearUserData();
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

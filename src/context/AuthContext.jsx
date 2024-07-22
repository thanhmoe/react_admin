import { createContext, useContext, useEffect, useState } from "react";
import {
	clearUserData,
	getUserData,
	setUserData,
} from "../utils/user_data_utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedUser = getUserData();
		if (storedUser) {
			setUser(storedUser);
		}
		setLoading(false);
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
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

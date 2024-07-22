import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Flex, Spin } from "antd";

const ProtectedRoute = ({ children, allowedRoles }) => {
	const { user, loading } = useAuth();

	// Check if user data is still loading
	if (loading) {
		return (
			<Flex align="center" gap="middle">
				<Spin size="large" />
			</Flex>
		); // or a loading spinner
	}

	if (!user) {
		return <Navigate to="/login" />;
	}
	if (!allowedRoles.includes(user.role))
		return <Navigate to="/unauthorized" />;

	return children;
};

export default ProtectedRoute;

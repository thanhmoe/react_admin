import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import MainLayout from "./layout/Index.jsx";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import { USER_ROLES } from "./utils/constants.js";

import Login from "./page/login/login.jsx";

import FilterableProductTable from "./page/products/FilterableProductTable.jsx";
import ProductDetail from "./page/products/ProductDetail.jsx";

import FilterableCategoryTable from "./page/categories/FilterableCategoryTable.jsx";

import FilterableOrderTable from "./page/orders/FilterableOderTable.jsx";

import Customer from "./page/customers/Customer.jsx";
import UnauthorizedPage from "./page/auth/UnauthoziedPage.jsx";

import BannerList from "./page/banners/BannerList.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<ProtectedRoute allowedRoles={[USER_ROLES.admin, USER_ROLES.staff]}>
				<MainLayout>
					<App />
				</MainLayout>
			</ProtectedRoute>
		),
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/products",
		element: (
			<ProtectedRoute allowedRoles={[USER_ROLES.admin]}>
				<MainLayout>
					<FilterableProductTable />
				</MainLayout>
			</ProtectedRoute>
		),
	},
	{
		path: "/products/:id",
		element: (
			<ProtectedRoute allowedRoles={[USER_ROLES.admin]}>
				<MainLayout>
					<ProductDetail />
				</MainLayout>
			</ProtectedRoute>
		),
	},
	{
		path: "/categories",
		element: (
			<ProtectedRoute allowedRoles={[USER_ROLES.admin]}>
				<MainLayout>
					<FilterableCategoryTable />
				</MainLayout>
			</ProtectedRoute>
		),
	},
	{
		path: "/orders/:status",
		element: (
			<ProtectedRoute allowedRoles={[USER_ROLES.staff]}>
				<MainLayout>
					<FilterableOrderTable />
				</MainLayout>
			</ProtectedRoute>
		),
	},
	{
		path: "/banners",
		element: (
			<ProtectedRoute allowedRoles={[USER_ROLES.admin]}>
				<MainLayout>
					<BannerList />
				</MainLayout>
			</ProtectedRoute>
		),
	},
	// {
	// 	path: "/customers",
	// 	element: (
	// 		<ProtectedRoute allowedRoles={[USER_ROLES.admin]}>
	// 			<MainLayout>
	// 				<Customer />
	// 			</MainLayout>
	// 		</ProtectedRoute>
	// 	),
	// },
	{
		path: "/unauthorized",
		element: (
			<UnauthorizedPage />
		)
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<ToastContainer />
		<RouterProvider router={router} />
	</AuthProvider>
);

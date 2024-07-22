import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import "./index.css"
import MainLayout from "./layout/Index.jsx"
import App from "./App.jsx"

import { AuthProvider } from "./context/AuthContext.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

import { USER_ROLES } from "./utils/constants.js"

import Login from "./page/login/login.jsx"

import FilterableProductTable from "./page/products/FilterableProductTable.jsx"
import ProductDetail from "./page/products/ProductDetail.jsx"

import FilterableCategoryTable from "./page/categories/FilterableCategoryTable.jsx"

import Customer from "./page/customers/Customer.jsx"

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<MainLayout>
				<App />
			</MainLayout>
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
		path: "/customers",
		element: (
			<ProtectedRoute allowedRoles={[USER_ROLES.admin]}>
				<MainLayout>
					<Customer />
				</MainLayout>
			</ProtectedRoute>
		),
	},
	{
		path: '/unauthorized',
		element: <h1>403 - Unauthorized</h1>, // Simple Unauthorized page
	},
])

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<ToastContainer />
		<RouterProvider router={router} />
	</AuthProvider>
)

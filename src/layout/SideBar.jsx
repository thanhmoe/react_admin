import React from "react";
import { Menu } from "antd";
import { useAuth } from "../context/AuthContext"; // Ensure the path is correct
import {
	HomeOutlined,
	UserOutlined,
	ShopOutlined,
	AppstoreOutlined,
} from "@ant-design/icons";
import { USER_ROLES } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";

export const MENU_ITEMS = [
	{
		key: "home",
		icon: <HomeOutlined />,
		label: "Home",
		path: "/",
		roles: [USER_ROLES.admin, USER_ROLES.staff],
	},
	{
		key: "products",
		icon: <ShopOutlined />,
		label: "Products",
		path: "/products",
		roles: [USER_ROLES.admin],
	},
	{
		key: "categories",
		icon: <AppstoreOutlined />,
		label: "Categories",
		path: "/categories",
		roles: [USER_ROLES.admin],
	},
	{
		key: "orders",
		icon: <AppstoreOutlined />,
		label: "Orders",
		path: "/orders/:status",
		roles: [USER_ROLES.staff],
		children: [
			{
				key: "all",
				label: "All",
				path: "/orders/all",
			},
			{
				key: "pending",
				label: "Pending",
				path: "/orders/pending",
			},
			{
				key: "processing",
				label: "Processing",
				path: "/orders/processing",
			},
			{
				key: "shipping",
				label: "Shipping",
				path: "/orders/shipping",
			},
			{
				key: "delivered",
				label: "Delivered",
				path: "/orders/delivered",
			},
			{
				key: "cancelled",
				label: "Cancelled",
				path: "/orders/cancelled",
			},
		],
	},
	// {
	// 	key: "customers",
	// 	icon: <UserOutlined />,
	// 	label: "Customers",
	// 	path: "/customers",
	// 	roles: [USER_ROLES.admin],
	// },
];

const filterMenuItemsByRole = (menuItems, role) => {
	return menuItems.filter((item) => item.roles.includes(role));
};

const findMenuItemByKey = (menuItems, key) => {
	for (const item of menuItems) {
		if (item.key === key) {
			return item;
		}
		if (item.children) {
			const found = findMenuItemByKey(item.children, key);
			if (found) {
				return found;
			}
		}
	}
	return null;
};

const Sidebar = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	const handleMenuClick = (e) => {
		const clickedItem = findMenuItemByKey(MENU_ITEMS, e.key);
		if (clickedItem && clickedItem.path) {
			navigate(clickedItem.path);
		}
	};

	const filteredMenuItems = filterMenuItemsByRole(MENU_ITEMS, user?.role);

	return (
		<Sider>
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={["home"]}
				defaultOpenKeys={["orders"]}
				items={filteredMenuItems}
				onClick={handleMenuClick}
			/>
		</Sider>
	);
};

export default Sidebar;

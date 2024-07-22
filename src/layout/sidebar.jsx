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
		key: "customers",
		icon: <UserOutlined />,
		label: "Customers",
		path: "/customers",
		roles: [USER_ROLES.admin],
	},
];

const filterMenuItemsByRole = (menuItems, role) => {
	return menuItems.filter((item) => item.roles.includes(role));
};

const Sidebar = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	const handleMenuClick = (e) => {
		const clickedItem = MENU_ITEMS.find((item) => item.key === e.key);
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
				items={MENU_ITEMS}
				onClick={handleMenuClick}
			/>
		</Sider>
	);
};

export default Sidebar;

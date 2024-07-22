import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOutStaff } from "../services/account_services";
import "./index.css";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { notify } from "../utils/notify_utils";
import { clearUserData, getUserData } from "../utils/user_data_utils";

const Header = () => {
	const navigate = useNavigate();
	const userData = getUserData();
	const items = [
		{
			label: <a onClick={() => handleSignOut()}>Sign Out</a>,
			key: "1",
		},
	];

	const handleSignOut = async () => {
		await logOutStaff();
		clearUserData();
		navigate("/login");
		notify("success", "You have been log out!");
	};

	useEffect(() => {
		if (!userData.auth_token) {
			navigate("/login");
		}
	});

	return (
		<header>
			<div>
				<h1 className="label-header" onClick={() => navigate("/")}>
					Mortendo: {userData.role}
				</h1>
			</div>
			<div className="admin-profile">
				<Dropdown menu={{ items }} trigger={["click"]}>
					<a onClick={(e) => e.preventDefault()}>
						<Space>
							{userData.role.toUpperCase()}
							<DownOutlined />
						</Space>
					</a>
				</Dropdown>
			</div>
		</header>
	);
};

export default Header;

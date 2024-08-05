import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOutStaff, updatePassword } from "../services/account_services";
import "./index.css";
import { Dropdown, Form, Input, Modal, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { notify } from "../utils/notify_utils";
import { clearUserData, getUserData } from "../utils/user_data_utils";
import { NOTIFY_STATUS } from "../utils/constants";

const Header = () => {
	const navigate = useNavigate();
	const userData = getUserData();

	const [form] = Form.useForm()
	const [open, setOpen] = useState(false)

	const items = [
		{
			key: "1",
			label: <a onClick={() => setOpen(true)}>Change Password</a>
		},
		{
			key: "2	",
			label: <a onClick={() => handleSignOut()}>Sign Out</a>,
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

	const handleUpdatePassword = () => {
		form.validateFields()
			.then(async (values) => {
				const result = await updatePassword(values)
				if (result.success) {
					setOpen(false);
					await logOutStaff()
					navigate("/login")
					notify(NOTIFY_STATUS.success, result.message);
				} else notify(NOTIFY_STATUS.error, result.message);
			})
			.catch((info) => { });
	}

	return (
		<header>
			<div>
				<h1 className="label-header" onClick={() => navigate("/")}>
					Mortendo: {userData.role}
				</h1>
			</div>
			<Modal
				open={open}
				title="Update password"
				okText="Confirm"
				cancelText="Cancel"
				onCancel={() => setOpen(false)}
				onOk={handleUpdatePassword}
				destroyOnClose
			>
				<Form
					layout="horizontal"
					form={form}
					name="form_in_modal"
					clearOnDestroy
					labelCol={{ span: 6, }}
					wrapperCol={{ span: 18, }}
				// onFinish={(values) => onCreate(values)}
				>
					<Form.Item
						name="old_pass"
						label="Old password"
						rules={[
							{
								required: true,
								message: 'Please input the old password!',
							},
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name="new_pass"
						label="New Password"
						rules={[
							{
								required: true,
								message: 'Please input the new password!',
							},
						]}
					>
						<Input.Password />
					</Form.Item>
				</Form>
			</Modal>
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

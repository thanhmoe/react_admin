import React, { useState } from "react";
import "./login.css";
import { loginStaff } from "../../services/account_services";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../utils/user_data_utils";
import { notify } from "../../utils/notify_utils";
import { NOTIFY_STATUS } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
import { Button, Checkbox, Flex, Form, Input, Space } from "antd";
import Title from "antd/es/typography/Title";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleLogin = async (values) => {
		try {
			const response = await loginStaff(values);
			if (response.success) {
				login(response.data);
				navigate("/");
				notify(NOTIFY_STATUS.success, "Logged in successfully!");
			} else {
				notify(NOTIFY_STATUS.error, response.data.message);
			}
		} catch (error) {
			notify(NOTIFY_STATUS.error, "Error!, login failed!");
		}
	};

	const onFinish = (values) => {
		handleLogin(values)
	};

	const handleForgotPassword = () => {
		navigate("/recover-password")
	}

	return (
		<Flex
			gap="middle"
			align="center"
			justify="center"
			vertical

		>
			<Space
				direction="vertical"
				style={{
					maxWidth: 600,
					border: "2px solid #ccc",
					padding: "20px 20px 0 20px",
					borderRadius: "5px"
				}}
			>
				<Title
					level={2}
					align="center"
				>
					Login
				</Title>
				<Form
					name="basic"
					onFinish={onFinish}
				>
					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								message: 'Please input your email!',
							},
						]}
					>
						<Input
							prefix={<UserOutlined />}
							placeholder="Email"
							size="large"
						/>
					</Form.Item>

					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}
					>
						<Input.Password
							prefix={<LockOutlined />}
							placeholder="Password"
							size="large"
						/>
					</Form.Item>

					<Form.Item>
						<Flex justify="space-around" align="center">
							<Button type="primary" htmlType="submit" style={{ width: 100 }}>
								Login
							</Button>
							<Button onClick={handleForgotPassword}>Forgot Password</Button>
						</Flex>
					</Form.Item>
				</Form>
			</Space>
		</Flex>
	);
};

export default Login;

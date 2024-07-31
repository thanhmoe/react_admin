import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./SideBar";

import "./index.css";

import { Layout } from "antd";
const { Content } = Layout

const MainLayout = ({ children }) => {
	return (
		<Layout
			style={{
				minHeight: "100vh",
			}}
		>
			<Sidebar />
			<Layout style={{ display: "flex", flexDirection: "column" }}>
				<Header />
				<Content style={{ flex: 1 }}>
					{children}
				</Content>
				<Footer />
			</Layout>
		</Layout>
	);
};

export default MainLayout;

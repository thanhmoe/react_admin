import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./index.css";

import { Layout } from "antd";
import Sidebar from "./SideBar";

const MainLayout = ({ children }) => {
	return (
		<Layout
			style={{
				minHeight: "100vh",
			}}
		>
			<Sidebar />
			<Layout>
				<Header />
				{children}
				<Footer />
			</Layout>
		</Layout>
	);
};

export default MainLayout;

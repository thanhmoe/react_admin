import { Pagination } from "antd";
import { useEffect, useState } from "react";

import OrderTable from "./components/OrderTable";

export default function FilterableOrderTable() {
	const [orders, setOrders] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemPerPage] = useState(10); // Number of items per page
	const [totalOrders, setTotalOrders] = useState(null);
	let initialOrderNumberIndex = (currentPage - 1) * itemsPerPage + 1;

	useEffect(() => {});

	const handlePageChange = (page) => {
		initialOrderNumberIndex = (page - 1) * itemsPerPage + 1;
		setCurrentPage(page);
	};

	const onShowSizeChange = (current, pageSize) => {
		initialOrderNumberIndex = (current - 1) * pageSize + 1;
		setCurrentPage(current);
		setItemPerPage(pageSize);
	};

	return (
		<div className="m-4">
			<h1>Orders</h1>
			<div className="flex items-center justify-between"></div>
			<OrderTable
				orders={orders}
				initialIndex={initialOrderNumberIndex}
			/>
			<Pagination
				showSizeChanger
				onShowSizeChange={onShowSizeChange}
				current={currentPage}
				total={totalOrders}
				onChange={handlePageChange}
			/>
		</div>
	);
}

import { message, Pagination, Select, Space } from "antd";
import { useCallback, useEffect, useState } from "react";

import OrderTable from "./components/OrderTable";
import Search from "antd/es/input/Search";
import { fetchOrders } from "../../services/order_services";
import { useParams } from "react-router-dom";

export default function FilterableOrderTable() {
	const [orders, setOrders] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemPerPage] = useState(10); // Number of items per page
	const [totalOrders, setTotalOrders] = useState(null);
	const [reloadPage, setReloadPage] = useState(false);
	const [error, setError] = useState(null); // Add error state

	const { status } = useParams();
	let initialOrderNumberIndex = (currentPage - 1) * itemsPerPage + 1;

	const fetchOrderList = async () => {
		try {
			const response = await fetchOrders({
				page: currentPage,
				limit: itemsPerPage,
				sortStatus: status,
			});

			if (response.success && response.orders) {
				setOrders(response.orders);
				setTotalOrders(response.total_orders);
				initialOrderNumberIndex = (currentPage - 1) * itemsPerPage + 1;
			} else {
				setError(response.message);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setReloadPage(false);
		}
	};

	// Fetch/refresh orders when page/items per page changed or reload
	useEffect(() => {
		fetchOrderList();
	}, [currentPage, itemsPerPage, reloadPage]);

	// Reset page number and item per page when the view status changed
	useEffect(() => {
		setCurrentPage(1)
		setItemPerPage(10)
		fetchOrderList()
	}, [status])

	// Show error when occurs
	useEffect(() => {
		if (error) {
			message.error(error);
		}
	}, [error]);

	const handlePageChange = (page) => {
		initialOrderNumberIndex = (page - 1) * itemsPerPage + 1;
		setCurrentPage(page);
	};

	const onShowSizeChange = (current, pageSize) => {
		initialOrderNumberIndex = (current - 1) * pageSize + 1;
		setCurrentPage(current);
		setItemPerPage(pageSize);
	};

	const handleReloadPage = useCallback(() => {
		setReloadPage(true);
	}, []);

	return (
		<div className="m-4" style={{ display: "flex", flexDirection: "column", minHeight: "90vh" }}>
			<div style={{ flex: 1, overflow: "auto" }}>
				<h1>Orders</h1>
				<div className="flex items-center justify-end">
					<Space wrap>
						<Search
							placeholder="input search customer email"
							allowClear
							style={{ width: 400 }}
							onSearch={() => { }}
						/>
					</Space>
				</div>
				<OrderTable
					orders={orders}
					initialIndex={initialOrderNumberIndex}
					onAction={handleReloadPage}
				/>
			</div>
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

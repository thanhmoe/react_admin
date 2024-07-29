import React, { Children, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	Pagination,
	Button,
	Space,
	Select,
	message,
	Input,
	Checkbox,
	Cascader,
	Switch,
} from "antd";
const { Search } = Input;

import { fetchProducts } from "../../services/product_services";
import { fetchAllCategories } from "../../services/category_services";

import ProductModal from "./components/ProductModal";
import ProductTable from "./components/ProductTable";

const SORT_OPTIONS_ORDERS = [
	{
		value: "modify_at", label: "Date modified",
		children: [
			{ value: "ASC", label: "Old to New" },
			{ value: "DESC", label: "New to Old" },
		]
	},
	{
		value: "create_at", label: "Date added",
		children: [
			{ value: "ASC", label: "Old to New" },
			{ value: "DESC", label: "New to Old" },
		]
	},
	{
		value: "name", label: "Name",
		children: [
			{ value: "ASC", label: "A-Z" },
			{ value: "DESC", label: "Z-A" },
		]
	},
	{
		value: "quantity_in_stock", label: "Quantity",
		children: [
			{ value: "ASC", label: "Low to High" },
			{ value: "DESC", label: "High to Low" },
		]
	},
	{
		value: "price", label: "Price",
		children: [
			{ value: "ASC", label: "Low to High" },
			{ value: "DESC", label: "High to Low" },
		]
	},
	// {
	// 	value: "like_count", label: "Like Count",
	// 	children: [
	// 		{ value: "ASC", label: "Low to High" },
	// 		{ value: "DESC", label: "High to Low" },
	// 	]
	// },
]

export default function FilterableProductTable() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemPerPage] = useState(10); // Number of items per page
	const [totalProducts, setTotalProducts] = useState(null);
	const [openProductModal, setOpenProductModal] = useState(false);
	const [reloadPage, setReloadPage] = useState(false);
	const [sortOption, setSortOption] = useState("modify_at");
	const [sortOrder, setSortOrder] = useState("DESC");
	const [textQuery, setTextQuery] = useState(null);
	const [isActive, setIsActive] = useState(true);
	const [error, setError] = useState(null); // Add error state
	let initialProductNumberIndex = (currentPage - 1) * itemsPerPage + 1

	useEffect(() => {
		const fetchProductList = async () => {
			try {
				const response = await fetchProducts({
					page: currentPage,
					limit: itemsPerPage,
					textQuery: textQuery,
					sortBy: sortOption,
					sortOrder: sortOrder,
					isActive: isActive ? 1 : 0,
					category: category,
				});
				if (response.success && response.products) {
					setProducts(response.products); // Update customer list from API
					setTotalProducts(response.total_products);
					initialProductNumberIndex = (currentPage - 1) * itemsPerPage + 1
				} else {
					setError(response.message);
				}
			} catch (error) {
				setError(error.message);
			} finally {
				setReloadPage(false);
			}
		};
		const fetchCategoryList = async () => {
			try {
				const response = await fetchAllCategories();
				if (response.success && response.categories) {
					const data = response.categories.map((cat) => {
						return { value: cat.id, label: cat.name };
					});
					setCategories(data);
				} else setError(response.message);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchProductList(); // Fetch data on initial component load
		fetchCategoryList();
	}, [
		currentPage,
		itemsPerPage,
		reloadPage,
		sortOption,
		sortOrder,
		isActive,
		textQuery,
		category,
	]);

	useEffect(() => {
		if (error) {
			message.error(error);
		}
	}, [error]);

	const handlePageChange = (page) => {
		initialProductNumberIndex = (page - 1) * itemsPerPage + 1
		setCurrentPage(page);
	};

	const onShowSizeChange = (current, pageSize) => {
		initialProductNumberIndex = (current - 1) * pageSize + 1
		setCurrentPage(current);
		setItemPerPage(pageSize);
	};

	const handleSortOptionChange = (value) => setSortOption(value);
	const handleSortOrderChange = (value) => setSortOrder(value);

	const handleCancelProductModal = (reloadingPage) => {
		if (reloadingPage) setReloadPage(true);
		setOpenProductModal(false);
	};

	const handleIsActiveChange = (e) => setIsActive(!isActive);

	const handleSearch = (value, event, info) => setTextQuery(value);

	const handleFilterOptionChange = (value, event, info) => setCategory(value);

	// Callback to trigger reload
	const handleAction = useCallback(() => {
		setReloadPage(true);
	}, []);

	const handleSortOptionAndOrderChange = (values) => {
		setSortOption(values[0])
		setSortOrder(values[1])
	}

	const handleClearSortOptionAndOrder = () => {
		setSortOption(null)
		setSortOrder(null)
	}

	return (
		<div className="m-4">
			<h1>Products</h1>
			<div className="flex items-center justify-between">
				<Button
					className="bg-green-600 text-white hover:!text-green-600 hover:!border-green-600"
					size="large"
					onClick={() => setOpenProductModal(true)}
				>
					Add new
				</Button>
				<Space wrap>
					<Switch
						size="default"
						checkedChildren="Active"
						unCheckedChildren="Inactive"
						checked={isActive}
						onChange={handleIsActiveChange}
					/>
					<Search
						placeholder="input search text"
						allowClear
						style={{ width: 400 }}
						onSearch={handleSearch}
					/>
					<Select
						style={{ width: 250 }}
						showSearch
						placeholder="Select a category"
						onChange={handleFilterOptionChange}
						options={categories}
						optionFilterProp="label"
						filterSort={(optionA, optionB) =>
							(optionA?.label ?? "")
								.toLowerCase()
								.localeCompare(
									(optionB?.label ?? "").toLowerCase()
								)
						}
					/>
					<Cascader
						expandTrigger="hover"
						style={{
							width: 250
						}}
						value={[sortOption, sortOrder]}
						options={SORT_OPTIONS_ORDERS}
						onChange={handleSortOptionAndOrderChange}
						onClear={handleClearSortOptionAndOrder}
					/>
				</Space>
			</div>
			<ProductTable products={products} onAction={handleAction} initialIndex={initialProductNumberIndex} />
			<Pagination
				showSizeChanger
				onShowSizeChange={onShowSizeChange}
				current={currentPage}
				total={totalProducts}
				onChange={handlePageChange}
			/>
			<ProductModal
				open={openProductModal}
				onCancel={handleCancelProductModal}
				categories={categories}
			/>
		</div>
	);
}

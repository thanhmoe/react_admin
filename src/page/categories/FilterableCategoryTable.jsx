import { useCallback, useEffect, useState } from "react"

import {
	Button,
	Checkbox,
	Pagination,
	Space,
	message,
	Select,
	Input,
	Switch,
	Cascader,
} from "antd"
const { Search } = Input

import { fetchCategories } from "../../services/category_services"
import CategoryTable from "./components/CategoryTable"
import CategoryModal from "./components/CategoryModal"

const SORT_OPTIONS_ORDERS = [
	{
		value: "modify_at",
		label: "Date modified",
		children: [
			{ value: "ASC", label: "Old to New" },
			{ value: "DESC", label: "New to Old" },
		],
	},
	{
		value: "create_at",
		label: "Date added",
		children: [
			{ value: "ASC", label: "Old to New" },
			{ value: "DESC", label: "New to Old" },
		],
	},
	{
		value: "name",
		label: "Name",
		children: [
			{ value: "ASC", label: "A-Z" },
			{ value: "DESC", label: "Z-A" },
		],
	},
]

const DEFAULT_ITEM_PER_PAGE = 10

const FilterableCategoryTable = () => {
	const [categories, setCategories] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemPerPage] = useState(DEFAULT_ITEM_PER_PAGE)
	const [totalCategories, setTotalCategories] = useState(null)
	const [sortOption, setSortOption] = useState("create_at")
	const [sortOrder, setSortOrder] = useState("DESC")
	const [textQuery, setTextQuery] = useState(null)
	const [isActive, setIsActive] = useState(true)
	const [error, setError] = useState(null) // Add error state
	const [openCategoryModal, setOpenCategoryModal] = useState(false)
	const [reloadPage, setReloadPage] = useState(false)
	let initialCategoryNumberIndex = (currentPage - 1) * itemsPerPage + 1

	const fetchData = async () => {
		try {
			const response = await fetchCategories({
				page: currentPage,
				limit: itemsPerPage,
				textQuery: textQuery,
				sortBy: sortOption,
				sortOrder: sortOrder,
				isActive: isActive ? 1 : 0,
			})
			if (response.success && response.categories) {
				setCategories(response.categories)
				setTotalCategories(response.total_categories)
				initialCategoryNumberIndex =
					(currentPage - 1) * itemsPerPage + 1
			} else {
				setError(response.message)
			}
		} catch (error) {
			setError(
				error.message || "An error occurred while fetching products"
			)
		} finally {
			setReloadPage(false)
		}
	}
	useEffect(() => {
		fetchData()
	}, [
		currentPage,
		itemsPerPage,
		sortOption,
		sortOrder,
		isActive,
		textQuery,
		reloadPage,
	])

	useEffect(() => {
		if (error) message.error(error)
	}, [error])

	const handlePageChange = (page) => {
		initialCategoryNumberIndex = (page - 1) * itemsPerPage + 1
		setCurrentPage(page)
	}

	const handleShowSizeChange = (current, pageSize) => {
		initialCategoryNumberIndex = (current - 1) * pageSize + 1
		setCurrentPage(current)
		setItemPerPage(pageSize)
	}

	const handleCancelCategoryModal = (reloadingPage) => {
		if (reloadingPage) setReloadPage(true)
		setOpenCategoryModal(false)
	}

	const handleIsActiveChange = (e) => {
		setIsActive(!isActive)
		resetPageAndItemPerPage()
	}

	const handleSearch = (value, event, info) => {
		setTextQuery(value)
		resetPageAndItemPerPage()
	}

	// Callback to trigger reload
	const handleAction = useCallback(() => {
		setReloadPage(true)
	}, [])

	const handleSortOptionAndOrderChange = (values) => {
		resetPageAndItemPerPage()
		setSortOption(values[0])
		setSortOrder(values[1])
	}

	const handleClearSortOptionAndOrder = () => {
		setSortOption(null)
		setSortOrder(null)
		resetPageAndItemPerPage()
	}

	const resetPageAndItemPerPage = () => {
		setCurrentPage(1)
		setItemPerPage(DEFAULT_ITEM_PER_PAGE)
	}

	return (
		<div
			className="m-4"
			style={{
				display: "flex",
				flexDirection: "column",
				minHeight: "90vh",
			}}
		>
			<div style={{ flex: 1, overflow: "auto" }}>
				<h1>Categories</h1>
				<div className="flex items-center justify-between">
					<Button
						className="bg-green-600 text-white hover:!text-green-600 hover:!border-green-600 my-2"
						size="large"
						onClick={() => setOpenCategoryModal(true)}
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
							placeholder="Input search text"
							allowClear
							style={{ width: 400 }}
							onSearch={handleSearch}
						/>
						<Cascader
							expandTrigger="hover"
							allowClear
							style={{
								width: 250,
							}}
							placement="bottomLeft"
							value={[sortOption, sortOrder]}
							options={SORT_OPTIONS_ORDERS}
							onChange={handleSortOptionAndOrderChange}
							onClear={handleClearSortOptionAndOrder}
						/>
					</Space>
				</div>
				<CategoryTable
					categories={categories}
					onAction={handleAction}
					initialIndex={initialCategoryNumberIndex}
				/>
			</div>
			<Pagination
				showSizeChanger
				onShowSizeChange={handleShowSizeChange}
				current={currentPage}
				total={totalCategories}
				onChange={handlePageChange}
			/>
			<CategoryModal
				open={openCategoryModal}
				onCancel={handleCancelCategoryModal}
			/>
		</div>
	)
}

export default FilterableCategoryTable

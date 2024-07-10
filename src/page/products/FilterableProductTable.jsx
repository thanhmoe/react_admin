import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
    Pagination,
    Button,
    Space,
    Select,
    message,
    Input,
    Checkbox,
} from "antd"
const { Search } = Input

import { fetchProducts } from "../../services/product_services"
import { fetchAllCategories } from "../../services/category_services"

import ProductModal from "./components/ProductModal"
import ProductTable from "./components/ProductTable"
import { info } from "autoprefixer"

const SORT_OPTIONS = [
    { value: "name", label: "Name" },
    { value: "quantity_in_stock", label: "In stock" },
    { value: "price", label: "Price" },
    { value: "like_count", label: "Like" },
    { value: "create_at", label: "Create at" },
    { value: "modify_at", label: "Modify at" },
]

const SORT_ORDERS = [
    { value: "ASC", label: "ASC" },
    { value: "DESC", label: "DESC" },
]

export default function FilterableProductTable() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemPerPage] = useState(10) // Number of items per page
    const [totalProducts, setTotalProducts] = useState(null)
    const [openProductModal, setOpenProductModal] = useState(false)
    const [reloadPage, setReloadPage] = useState(false)
    const [sortOption, setSortOption] = useState(null)
    const [sortOrder, setSortOrder] = useState(null)
    const [textQuery, setTextQuery] = useState(null)
    const [isActive, setIsActive] = useState(true)
    const [error, setError] = useState(null) // Add error state

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
                    category: category
                })
                if (response.success && response.products) {
                    setProducts(response.products) // Update customer list from API
                    setTotalProducts(response.total_products)
                } else {
                    setError(response.message)
                }
            } catch (error) {
                setError(error.message)
            } finally {
                setReloadPage(false)
            }
        }
        const fetchCategoryList = async () => {
            try {
                const response = await fetchAllCategories()
                if (response.success && response.categories) {
                    const data = response.categories.map((cat) => {
                        return { value: cat.id, label: cat.name }
                    })
                    setCategories(data)
                }
                else setError(response.message)
            } catch (error) {
                setError(error.message)
            } finally {
                setReloadPage(false)
            }
        }
        fetchProductList() // Fetch data on initial component load
        fetchCategoryList()
    }, [
        currentPage,
        itemsPerPage,
        reloadPage,
        sortOption,
        sortOrder,
        isActive,
        textQuery,
        category,
    ])

    useEffect(() => {
        if (error) {
            message.error(error)
        }
    }, [error])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const onShowSizeChange = (current, pageSize) => {
        setCurrentPage(current)
        setItemPerPage(pageSize)
    }

    const handleSortOptionChange = (value) => setSortOption(value)
    const handleSortOrderChange = (value) => setSortOrder(value)

    const handleCancelProductModal = (reloadingPage) => {
        if (reloadingPage) window.location.reload(true)
        setOpenProductModal(false)
    }

    const handleIsActiveChange = (e) => setIsActive(!isActive)

    const handleSearch = (value, event, info) => setTextQuery(value)

    const handleFilterOptionChange = (value, event, info) => setCategory(value)

    return (
        <div className="products-container">
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
                    <Checkbox
                        onChange={handleIsActiveChange}
                        checked={isActive}
                    >
                        Active
                    </Checkbox>
                    <Search
                        placeholder="input search text"
                        allowClear
                        style={{ width: 400 }}
                        onSearch={handleSearch}
                    />
                    <Select
                        style={{ width: 250 }}
                        onChange={handleFilterOptionChange}
                        options={categories}
                    />
                    <Select
                        defaultValue="modify_at"
                        style={{ width: 150 }}
                        onChange={handleSortOptionChange}
                        options={SORT_OPTIONS}
                    />
                    <Select
                        defaultValue="DESC"
                        style={{ width: 130 }}
                        options={SORT_ORDERS}
                        onChange={handleSortOrderChange}
                    />
                </Space>
            </div>
            <ProductTable products={products} />
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
            />
        </div>
    )
}

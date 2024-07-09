import { useEffect, useState } from "react"

import { Button, Checkbox, Pagination, Space, message, Select, Input } from "antd"
const { Search } = Input

import { fetchCategories } from "../../services/category_services"
import CategoryTable from "./components/CategoryTable"
import CategoryModal from "./components/CategoryModal"


const SORT_OPTIONS = [
   { value: "name", label: "Name" },
   { value: "create_at", label: "Create at" },
]

const SORT_ORDERS = [
   { value: "ASC", label: "ASC" },
   { value: "DESC", label: "DESC" },
]

const FilterableCategoryTable = () => {
   const [categories, setCategories] = useState([])
   const [currentPage, setCurrentPage] = useState(1)
   const [itemsPerPage, setItemPerPage] = useState(10)
   const [totalCategories, setTotalCategories] = useState(null)
   const [sortOption, setSortOption] = useState(null)
   const [sortOrder, setSortOrder] = useState(null)
   const [textQuery, setTextQuery] = useState(null)
   const [isActive, setIsActive] = useState(true)
   const [error, setError] = useState(null) // Add error state
   const [openCategoryModal, setOpenCategoryModal] = useState(false)

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
         } else {
            setError("Failed to fetch categories!")
         }
      } catch (error) {
         setError(
            error.message
            || "An error occurred while fetching products"
         )
      }
   }
   useEffect(
      () => { fetchData() },
      [
         currentPage,
         itemsPerPage,
         sortOption,
         sortOrder,
         isActive,
         textQuery,
      ]
   )

   useEffect(
      () => {
         if (error)
            message.error(error)
      },
      [error]
   )

   const handlePageChange = (page) => setCurrentPage(page)

   const handleShowSizeChange = (current, pageSize) => {
      setCurrentPage(current)
      setItemPerPage(pageSize)
   }

   const handleSortOptionChange = (value) => setSortOption(value)

   const handleSortOrderChange = (value) => setSortOrder(value)

   const handleCancelCategoryModal = (reloadingPage) => {
      if (reloadingPage) window.location.reload(true)
      setOpenCategoryModal(false)
   }

   const handleIsActiveChange = (e) => setIsActive(!isActive)

   const handleSearch = (value, event, info) => setTextQuery(value)

   return (
      <div>
         <h1>Categories</h1>
         <div className="flex items-center justify-between">
            <Button
               className="bg-green-600 text-white hover:!text-green-600 hover:!border-green-600"
               size="large"
               onClick={() => setOpenCategoryModal(true)}
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
                  defaultValue="name"
                  style={{ width: 150 }}
                  onChange={handleSortOptionChange}
                  options={SORT_OPTIONS}
               />
               <Select
                  defaultValue="ASC"
                  style={{ width: 130 }}
                  options={SORT_ORDERS}
                  onChange={handleSortOrderChange}
               />
            </Space>
         </div>
         <CategoryTable categories={categories} />
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
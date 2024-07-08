import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Pagination, Button, Space, Select, message, Input, Checkbox } from 'antd';
const { Search } = Input;

import './product.css';
import { formatISODate } from '../../utils/date_utils';

import ProductModal from './components/ProductModal';
import { fetchProducts } from '../../services/product_services';
import ProductStatusConfirmModal from './components/ProductStatusConfirmModal';

const sortOptions = [
    { value: 'name', label: 'Name', },
    { value: 'quantity_in_stock', label: 'In stock', },
    { value: 'price', label: 'Price', },
    { value: "like_count", label: "Like" },
    { value: 'create_at', label: 'Create at', },
    { value: 'modify_at', label: 'Modify at', },
];

const SORT_ORDERS = [{ value: "ASC", label: "ASC" }, { value: "DESC", label: "DESC" }];

function ProductRow({ product }) {
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const navigate = useNavigate();

    const handleCancelProductModal = () => setOpenUpdateModal(false);

    const handleCancelConfirmModal = () => setOpenConfirmModal(false);

    const handleViewDetail = () => navigate(`/products/${product.id}`);

    return (
        <tr>
            <td className='border border-slate-600 p-2 whitespace-nowrap'>
                <img className='w-32 h-32 object-contain' src={product.image_path} alt="" />
            </td>
            <td className='border border-slate-600 p-2 text-left text-ellipsis'>{product.name}</td>
            <td className='border border-slate-600 p-2 flex-1 text-right'>{product.quantity_in_stock}</td>
            <td className='border border-slate-600 p-2 flex-1 text-right'>{product.price}</td>
            <td className='border border-slate-600 p-2 flex-1 text-right'>
                <div className="flex flex-col items-end space-y-1">
                    <span className="text-green-500">{product.like_count}</span>
                    <span className="text-red-500">{product.dislike_count}</span>
                </div>
            </td>
            <td className='border border-slate-600 p-2 flex-1 text-right'>{0}</td>
            <td className='border border-slate-600 p-2 text-right whitespace-nowrap'>
                {formatISODate(product.create_at)}
            </td>
            <td className='border border-slate-600 p-2 text-right whitespace-nowrap'>
                {formatISODate(product.modify_at)}
            </td>
            <td className='border border-slate-600 p-2 text-left whitespace-nowrap'>
                <Space wrap direction='horizontal' size='small'>
                    <Button
                        className="bg-transparent border !border-yellow-600 text-yellow-600 hover:!bg-yellow-600 hover:!text-white"
                        onClick={() => setOpenUpdateModal(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        className="bg-transparent border !border-blue-600 text-blue-600 hover:!bg-blue-600 hover:!text-white"
                        onClick={handleViewDetail}
                    >
                        View
                    </Button>
                    {Boolean(product.is_active)
                        ? <Button
                            className="bg-transparent border !border-red-600 text-red-600 hover:!bg-red-600 hover:!text-white"
                            onClick={() => setOpenConfirmModal(true)}
                        >
                            Disable
                        </Button>
                        : <Button
                            className="bg-transparent border !border-green-600 text-green-600 hover:!bg-green-600 hover:!text-white"
                            onClick={() => setOpenConfirmModal(true)}
                        >
                            Enable
                        </Button>}
                </Space>
                <ProductModal open={openUpdateModal} product={product} onCancel={handleCancelProductModal} />
                <ProductStatusConfirmModal
                    open={openConfirmModal}
                    product={product}
                    onCancel={handleCancelConfirmModal}
                />
            </td>
        </tr>
    );
}

function ProductTable({ products, }) {
    const rows = products.map((each) => {
        return <ProductRow product={each} key={each.id} />;
    });

    return (
        <div className='overflow-x-auto my-2'>
            <table className='min-w-full divide-y divide-gray-500 border table-auto'>
                <thead className='bg-gray-200 divide-y'>
                    <tr>
                        <th className='border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wide w-40 min-w-40 max-w-48'></th>
                        <th className='border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-1/4 min-w-1/4 max-w-1/4 max-h-40'>Name</th>
                        <th className='border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-20 min-w-16 max-w-48'>In Stock</th>
                        <th className='border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-20 min-w-16 max-w-48'>Price</th>
                        <th className='border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-24'>React</th>
                        <th className='border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-24'>Total sold</th>
                        <th className='border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-48 max-w-48'>Create at</th>
                        <th className='border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-48 max-w-48'>Modify at</th>
                        <th className='border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-36'>Actions</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}

export default function FilterableProductTable() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemPerPage] = useState(10); // Number of items per page
    const [totalProducts, setTotalProducts] = useState(null);
    const [openProductModal, setOpenProductModal] = useState(false);
    const [reloadPage, setReloadPage] = useState(false);
    const [sortOption, setSortOption] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [textQuery, setTextQuery] = useState(null);
    const [isActive, setIsActive] = useState(true);
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchProducts({
                    page: currentPage,
                    limit: itemsPerPage,
                    textQuery: textQuery,
                    sortBy: sortOption,
                    sortOrder: sortOrder,
                    isActive: isActive ? 1 : 0,
                });
                if (response.success && response.products) {
                    setProducts(response.products); // Update customer list from API
                    setTotalProducts(response.total_products);
                    setError(null);
                } else {
                    setError('Failed to fetch products!');
                }
            } catch (error) {
                setError(error.message || 'An error occurred while fetching products!');
            } finally {
                setReloadPage(false);
            }
        };
        fetchData(); // Fetch data on initial component load
    }, [currentPage, itemsPerPage, reloadPage, sortOption, sortOrder, isActive, textQuery]);

    useEffect(() => {
        if (error) {
            message.error(error);
        }
    }, [error]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const onShowSizeChange = (current, pageSize) => {
        setCurrentPage(current);
        setItemPerPage(pageSize);
    };

    const handleSortOptionChange = (value) => setSortOption(value);
    const handleSortOrderChange = (value) => setSortOrder(value);

    const handleCancelProductModal = (reloadingPage) => {
        if (reloadingPage)
            window.location.reload(true);
        setOpenProductModal(false);
    };

    const handleIsActiveChange = (e) => setIsActive(!isActive);

    const handleSearch = (value, event, info) => setTextQuery(value);

    return (
        <div className="products-container">
            <h1>Products</h1>
            <div className='flex items-center justify-between'>
                <Button
                    className='bg-green-600 text-white hover:!text-green-600 hover:!border-green-600'
                    size='large'
                    onClick={() => setOpenProductModal(true)}
                >
                    Add new
                </Button>
                <Space wrap>
                    <Checkbox onChange={handleIsActiveChange} checked={isActive}>Active</Checkbox>
                    <Search
                        placeholder="input search text"
                        allowClear
                        style={{ width: 400, }}
                        onSearch={handleSearch}
                    />
                    <Select
                        defaultValue="modify_at"
                        style={{ width: 150, }}
                        onChange={handleSortOptionChange}
                        options={sortOptions}
                    />
                    <Select
                        defaultValue="DESC"
                        style={{ width: 130, }}
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
    );
}
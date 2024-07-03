import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Pagination, Button, Space, Modal } from 'antd';

import './product.css';
import { formatISODate } from '../../utils/date_utils';

import ProductModal from './components/ProductModal';
import { fetchProduct } from '../../services/product_services';
import { fetchCategory } from '../../services/category_services';

function ProductRow({ product }) {
    return (
        <tr>
            <td className='border border-slate-600 p-2 whitespace-nowrap'>
                <img className='w-36 h-36 object-contain' src={product.image_path} alt="" />
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
            <td className='border border-slate-600 p-2 text-right whitespace-nowrap'>
                {formatISODate(product.create_at)}
            </td>
            <td className='border border-slate-600 p-2 text-right whitespace-nowrap'>
                {formatISODate(product.modify_at)}
            </td>
            <td className='border border-slate-600 p-2 text-left whitespace-nowrap'>
                <Space direction='vertical' size='small'>
                    <Button className="bg-transparent border !border-yellow-600 text-yellow-600 hover:!bg-yellow-600 hover:!text-white">
                        Edit
                    </Button>
                    <Button className="bg-transparent border !border-blue-600 text-blue-600 hover:!bg-blue-600 hover:!text-white">
                        View
                    </Button>
                    <Button className="bg-transparent border !border-red-600 text-red-600 hover:!bg-red-600 hover:!text-white">
                        Disable
                    </Button>
                </Space>
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
                        <th className='border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-48 max-w-48'>Create at</th>
                        <th className='border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-48 max-w-48'>Modify at</th>
                        <th className='border border-slate-500 p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-28'>Actions</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}

export default function FilterableProductTable() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const [totalProducts, setTotalProducts] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchProduct({
                    page: currentPage,
                    limit: itemsPerPage
                });
                if (response.success && response.products) {
                    setProducts(response.products); // Update customer list from API
                    setTotalProducts(response.total_products);
                } else {
                    setError(response.message || 'Failed to fetch products!');
                }
            } catch (error) {
                setError(data.message);
            }
        };
        fetchData(); // Fetch data on initial component load
    }, [currentPage]);

    /* const handleEdit = (customerId) => {
        navigate(`/customer/${customerId}`);
    }; */

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const [open, setOpen] = useState(false);

    return (
        <div className="products-container">
            <h1>Products</h1>
            <Button
                className='bg-green-600 text-white hover:!text-green-600 hover:!border-green-600'
                size='large'
                onClick={() => setOpen(true)}
            >
                Add new
            </Button>
            {error && <div className="error-message">{error}</div>}
            <ProductTable products={products} />
            <Pagination
                current={currentPage}
                total={totalProducts}
                pageSize={itemsPerPage}
                onChange={handlePageChange}

            />
            <ProductModal
                open={open}
                onCreate={() => { }}
                onCancel={() => setOpen(false)}
            />
        </div>
    );
}
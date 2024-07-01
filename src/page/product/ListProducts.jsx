import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './product.css';
import { Pagination } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { fetchProduct } from '../../utils/api';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProduct();
                if (data.success && data.data) {
                    setProducts(data.data); // Update customer list from API
                } else {
                    setError(data.message || 'Failed to fetch cproducts');
                }
            } catch (error) {
                console.error('Error fetching customers:', error);
                setError(data.message);

            }
        };

        fetchData(); // Fetch data on initial component load
    }, []);


    // const handleEdit = (customerId) => {
    //     navigate(`/customer/${customerId}`);
    // };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="products-container">
            <h2>Products List</h2>
            {error && <div className="error-message">{error}</div>}
            <table className="products-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Categories</th>
                        {/* <th>Is Active</th>
                        <th>Create At</th>
                        <th>Modify At</th>
                        <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        currentItems.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.is_active ? 'Yes' : 'No'}</td>
                                <td>
                                    <button className='btn-edit' onClick={() => handleEdit(product.id)}>{<EditOutlined />}</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No products found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination
                defaultCurrent={currentPage}
                total={products.length}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
                className="pagination"
            />
        </div>
    );
}

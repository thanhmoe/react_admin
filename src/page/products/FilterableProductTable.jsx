import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './product.css';

import { Pagination, Button, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { fetchProduct } from '../../services/product_services';

function ProductRow({ product }) {
    return (
        <tr> <td className='border border-slate-600 p-2 w-28'>
                <img className='w-28 h-28 object-contain' src={product.image_path} alt="" />
            </td>
            <td className='border border-slate-600 p-2'>{product.name}</td>
            {/* <td>{product.quantity_in_stock}</td> */}
            <td className='border border-slate-600 p-2 w-20'>{product.quantity}</td>
            <td className='border border-slate-600 p-2 w-20'>{product.price}</td>
            <td className='border border-slate-600 p-2'>
                <Space direction='vertical' size="small">
                    <span className='text-green-500'>{product.like_count}</span>
                    <span className='text-red-500'>{0}</span>
                </Space>
            </td>
            <td className='border border-slate-600 p-2'>{product.is_active}</td>
            <td className='border border-slate-600 p-2'>{product.create_at}</td>
            <td className='border border-slate-600 p-2'>{product.modify_at}</td>
            <td className='border border-slate-600 p-2 w-20'>
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
    const rows = [];
    products.forEach((each) => {
        rows.push(
            <ProductRow product={each} key={each.id} />
        );
    });

    return (
        <table className='min-w-full border-collapse border border-slate-500'>
            <thead className='bg-gray-300 divide-y'>
                <tr>
                    <th className='border border-slate-600'></th>
                    <th className='border border-slate-600 w-1/4'>Name</th>
                    <th className='border border-slate-600'>In Stock</th>
                    <th className='border border-slate-600'>Price</th>
                    <th className='border border-slate-600'>React</th>
                    <th className='border border-slate-600'>Is Active</th>
                    <th className='border border-slate-600'>Create at</th>
                    <th className='border border-slate-600'>Modify at</th>
                    <th className='border border-slate-600'>Action</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

export default function FilterableProductTable() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const navigate = useNavigate();
    let totalProducts;
    useEffect(() => {
        const fetchData = async () => {
            // try {
            //     const response = await fetchProduct();
            //     if (response.success && response.products) {
            //         setProducts(response.products); // Update customer list from API
            //         totalProducts = response.total_products
            //     } else {
            //         setError(response.message || 'Failed to fetch products!');
            //     }
            // } catch (error) {
            //     console.error('Error fetching customers:', error);
            //     setError(data.message);
            // }
            setProducts(MOCK_DATA.products);
            totalProducts = MOCK_DATA.total_products;
        };
        fetchData(); // Fetch data on initial component load
    }, [currentPage]);

    // const handleEdit = (customerId) => {
    //     navigate(`/customer/${customerId}`);
    // };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleAddNewClick = () => {

    };

    return (
        <div className="products-container">
            <h1>Products</h1>
            <Button className='bg-green-600 text-white hover:bg-green-700' size='large' onClick={handleAddNewClick}>Add new</Button>
            {error && <div className="error-message">{error}</div>}
            <ProductTable products={products} />
            <Pagination
                defaultCurrent={currentPage}
                total={totalProducts}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
                className="pagination"
            />
        </div>
    );
}

const MOCK_DATA = {
    "success": true,
    "message": "Found: 19 products",
    "total_products": 19,
    "products": [
        {
            "id": 60,
            "name": "Mega Pokémon Building Toys Set Motion Pikachu with 1092 Pieces and Running Movement",
            "price": "66.99",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/84dcf4b3-dd73-455c-a85f-9d9d3b80952d1719559503220.jpg"
        },
        {
            "id": 59,
            "name": "LEGO Ideas Fender Stratocaster 21329 DIY Guitar Model Building Set for Music Lovers",
            "price": "95.99",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/3fbdc016-2bc8-4133-b301-d254f7ebb79d1719559421942.jpg"
        },
        {
            "id": 58,
            "name": "LEGO Technic Mack LR Electric Garbage Truck Toy",
            "price": "32.00",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/954ecd17-fe66-4cd4-b0e4-a44e77d4ef3c1719559345416.jpg"
        },
        {
            "id": 57,
            "name": "LEGO Technic McLaren Senna GTR 42123 Racing Sports Collectable Model Car Building Kit",
            "price": "40.00",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/4fcdb9e7-28a9-4c7b-8048-fa45d5c6c76e1719558899718.jpg"
        },
        {
            "id": 56,
            "name": "LEGO Technic Remote Controlled Stunt Racer 42095 Building Kit ",
            "price": "85.89",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/e9111faf-45f7-4faa-8dbc-0917843d46551719558835610.jpg"
        },
        {
            "id": 55,
            "name": "Astronaut Plush – Red",
            "price": "26.99",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/25495d75-badd-4fd9-80a7-91bb2ab0dcac1719558675302.jpg"
        },
        {
            "id": 54,
            "name": "Astronaut Plush – Pink",
            "price": "26.99",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/b21dfdf3-e7dc-41a4-8b9a-f2024e97d8551719558646404.jpg"
        },
        {
            "id": 53,
            "name": "Astronaut Plush – Blue",
            "price": "26.99",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/1f692fa3-5366-4e52-9bfb-a83397889cfb1719558628392.jpg"
        },
        {
            "id": 52,
            "name": "Shark Suit Guy Plush",
            "price": "26.99",
            "quantity": 100,
            "like_count": 10,
            "image_path": "http://localhost:3000/products/661d60b5-c98b-4217-b893-073a893327001719558595352.jpg"
        },
        {
            "id": 51,
            "name": "LEGO City People Pack – Outdoors Adventures 60202 Building Kit",
            "price": "59.99",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/ea80c9cd-78c9-414c-99c5-1454f88340851719558460274.jpg"
        },
        {
            "id": 50,
            "name": "LEGO Friends Sports Center 41744",
            "price": "159.99",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/651185d5-c554-42f8-9506-c0567833662a1719558349727.jpg"
        },
        {
            "id": 48,
            "name": "LEGO City Great Vehicles Diving Yacht 60221 Building Kit",
            "price": "23.99",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/d5b22001-4c65-40fe-a107-2d6b3f2fce1b1719558265373.jpg"
        },
        {
            "id": 47,
            "name": "LEGO Art Hokusai – The Great Wave 31208",
            "price": "83.39",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/758f149f-a93b-4bb3-9f49-cabe541bf4df1719557971684.png"
        },
        {
            "id": 46,
            "name": "Cute Banana Pen Holder",
            "price": "19.99",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/60317599-5046-432a-ac65-ad7f7014007d1719557840473.jpg"
        },
        {
            "id": 45,
            "name": "LEGO Education 9641 Pneumatics",
            "price": "130.00",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/236739c3-8097-4113-aaf4-19f0227e55151719557633780.jpg"
        },
        {
            "id": 44,
            "name": "LEGO NINJAGO: Imperium Dragon Hunter Hound Ninja Set (71790)",
            "price": "24.99",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/38911307-4874-4f76-ac05-4285031f73771719557163135.jpeg"
        },
        {
            "id": 43,
            "name": "LEGO Marvel Captain America Construction Figure Playset 76258",
            "price": "32.99",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/225926fe-7b11-46c0-9eef-ae626f6d2c481719556923219.jpeg"
        },
        {
            "id": 42,
            "name": "LEGO NINJAGO Jay's Titan Mech 71785",
            "price": "19.99",
            "quantity": 100,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/224cc0ef-c7e6-4077-887b-4f630c14ed451719556736192.jpg"
        },
        {
            "id": 41,
            "name": "LEGO Despicable Me 4 Brick-Built Gru and Minions Figure",
            "price": "45.00",
            "quantity": 160,
            "like_count": 0,
            "image_path": "http://localhost:3000/products/62174cca-6805-4452-8546-19dca16cf0c51719556537304.jpg"
        }
    ],
};
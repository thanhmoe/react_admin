import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, Cell } from 'recharts';
import { message, Segmented, Space, DatePicker, Flex, Card, Pagination, Select } from 'antd';
import { getTopSellingProductsForAdmin } from '../services/product_services';
import dayjs from 'dayjs';

const TopSellingProductsChart = () => {
    const dateFormat = "YYYY-MM-DD";

    const today = dayjs().format(dateFormat);

    const startOfWeek = dayjs().startOf('week').format(dateFormat);
    const endOfWeek = dayjs().endOf('week').format(dateFormat);
    const startOfMonth = dayjs().startOf('month').format(dateFormat);
    const endOfMonth = dayjs().endOf('month').format(dateFormat);

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [startDate, setStartDate] = useState(startOfWeek);
    const [endDate, setEndDate] = useState(today);

    const handleIntervalChange = (value) => {
        switch (value) {
            case 'week':
                setStartDate(startOfWeek);
                setEndDate(endOfWeek);
                break;
            case 'month':
                setStartDate(startOfMonth);
                setEndDate(endOfMonth);
                break;
            default:
                break;
        }
        setCurrentPage(1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getTopSellingProductsForAdmin({
                    page: currentPage,
                    limit: itemsPerPage,
                    startDate: startDate,
                    endDate: endDate,
                });
                if (res.success) {
                    setData(res.data);
                }
            } catch (error) {
                message.error("An error occurred while fetching data.");
            }
        };
        fetchData();
    }, [currentPage, itemsPerPage, startDate, endDate]);

    const COLORS = ['#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FF0000', '#8884d8', '#82ca9d', '#d0ed57'];

    const truncate = (str, maxLength) => {
        return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
    };

    return (
        <div className='top-selling-products p-4'>
            <Card title="Top Selling Products">
                <Flex justify='flex-end'>
                    <Segmented
                        style={{ margin: '1rem' }}
                        defaultValue='week'
                        options={['week', 'month']}
                        onChange={handleIntervalChange}
                    />
                </Flex>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            tickFormatter={(name) => truncate(name, 10)} // Truncate product names to 10 characters
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total_revenue" name="Total Revenue ($)">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default TopSellingProductsChart;

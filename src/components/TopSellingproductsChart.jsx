import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { message, Segmented, Space, DatePicker, Flex, Card, Pagination, Select } from 'antd';
import { getTopSellingProductsForAdmin } from '../services/product_services';
import dayjs from 'dayjs';

const TopSellingProductsChart = () => {
    const dateFormat = "YYYY-MM-DD"

    const today = dayjs().format(dateFormat)

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

    return (
        <div className='top-selling-products p-4'>
            <Card title="Top Selling Products">
                <Flex justify='flex-end'>
                    <Segmented style={{ margin: '1rem' }}
                        defaultValue='week'
                        options={['week', 'month']}
                        onChange={handleIntervalChange}
                    />
                </Flex>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                        />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="total_units_sold" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="total_revenue" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default TopSellingProductsChart;
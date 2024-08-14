import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { message, Segmented, Space, DatePicker, Flex, Card, Pagination, Select } from 'antd';
import { getTopSellingProductsForAdmin } from '../services/product_services';
import dayjs from 'dayjs';

const TopSellingProductsChart = () => {
    const today = dayjs().format("YYYY-MM-DD")
    const startOfWeek = dayjs().startOf('week').format("YYYY-MM-DD");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [totalItems, setTotalitems] = useState(null)
    const [startDate, setStartDate] = useState(startOfWeek);
    const [endDate, setEndDate] = useState(today);
    const [interval, setInterval] = useState("day");

    // const { RangePicker } = DatePicker;
    // const onDateChange = (dates, dateStrings) => {
    //     if (dates) {
    //         setStartDate(dateStrings[0]);
    //         setEndDate(dateStrings[1])
    //         setCurrentPage(1)
    //     }
    //     if (dates === null) {
    //         setStartDate("2024-01-01");
    //         setEndDate(today)
    //         setCurrentPage(1)
    //     }
    // }
    // const handlePageChange = (page, pageSize) => {
    //     setCurrentPage(page);
    //     setItemsPerPage(pageSize);
    // }
    const handleIntervalChange = (value) => {
        setInterval(value);
        if (value === 'week') {
            const startOfWeek = dayjs().startOf('week').format('YYYY-MM-DD');
            setStartDate(startOfWeek);
        } else if (value === 'month') {
            const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
            setStartDate(startOfMonth);
        }
        setEndDate(today);
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
                    console.log(res.data);

                    setData(res.data);
                }
            } catch (error) {
                message.error("An error occurred while fetching data.");
            }
        };
        fetchData();
    }, [currentPage, itemsPerPage, startDate, endDate, interval]);

    return (
        <div className='top-selling-products p-4'>
            <Card title="Top Selling Products">
                <Flex justify='flex-end'>
                    <Space>
                        <Segmented style={{ margin: '1rem' }}
                            defaultValue='week'
                            options={['week', 'month']}
                            onChange={handleIntervalChange}
                        />
                    </Space>
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
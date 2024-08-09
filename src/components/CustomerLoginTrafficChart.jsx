import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { getCustomerLoginTraffic } from '../services/customer_services';
import { message, Segmented, Space, DatePicker, Flex, Card, Pagination, Select } from 'antd';
import { CUSTOMER_LOGIN_FILTER } from '../utils/constants';
const CustomerLoginTrafficChart = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalItems, setTotalitems] = useState(null)
    const [startDate, setStartDate] = useState("2024-01-01");
    const [endDate, setEndDate] = useState("2025-01-01");
    const [interval, setInterval] = useState("day");
    const [sortOption, setSortOption] = useState(0);

    const { RangePicker } = DatePicker;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCustomerLoginTraffic({
                    page: currentPage,
                    limit: itemsPerPage,
                    startDate: startDate,
                    endDate: endDate,
                    interval: interval,
                    sortBy: CUSTOMER_LOGIN_FILTER[sortOption].sortBy,
                    sortOrder: CUSTOMER_LOGIN_FILTER[sortOption].sortOrder
                });
                if (res.success) {
                    setData(res.data)
                    setTotalitems(res.total)
                }
            } catch (error) {
                message.error(
                    "An error occurred while fetching product details."
                );
            }
        };
        fetchData();
    }, [currentPage, itemsPerPage, startDate, endDate, interval, sortOption]);

    const onDateChange = (dates, dateStrings) => {
        if (dates) {
            setStartDate(dateStrings[0]);
            setEndDate(dateStrings[1])
            setCurrentPage(1)
        }
        if (dates === null) {
            setStartDate("2024-01-01");
            setEndDate("2025-01-01")
            setCurrentPage(1)
        }
    }
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setItemsPerPage(pageSize);
    }
    const handleIntervalChange = (value) => {
        setInterval(value)
        setCurrentPage(1)
    }
    const handleSortChange = (value) => {
        setSortOption(value)
    };

    return (
        <div className='customer-login-traffic p-4'>
            <Card title="Customer login traffic">
                <Flex justify='flex-end'>
                    <Space>
                        <RangePicker
                            onChange={onDateChange}
                            format="YYYY-MM-DD" />
                        <Segmented style={{ margin: '1rem' }}
                            defaultValue='day'
                            options={['day', 'week', 'month']}
                            onChange={handleIntervalChange}
                        />
                        <Select placeholder={'Sort Option'} style={{ width: 200 }} onChange={handleSortChange}>
                            {CUSTOMER_LOGIN_FILTER.map(option => (
                                <Option key={option.id} value={option.id}>{option.name}</Option>
                            ))}
                        </Select>
                    </Space>
                </Flex>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
                <Pagination
                    total={totalItems}
                    current={currentPage}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                    showSizeChanger={handlePageChange}
                />
            </Card>
        </div>
    );
};

export default CustomerLoginTrafficChart;

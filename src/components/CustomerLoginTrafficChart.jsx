import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { getCustomerLoginTraffic } from '../services/customer_services';
import { message, Segmented, Space, DatePicker, Flex, Card, Pagination, Select } from 'antd';
import { CUSTOMER_TRAFFIC_SORT_FILTER } from '../utils/constants';
import dayjs from 'dayjs';

const CustomerLoginTrafficChart = () => {
    const dateFormat = "YYYY-MM-DD"
    const today = dayjs().format(dateFormat)

    const startOfWeek = dayjs().startOf('week').format(dateFormat);
    const endOfWeek = dayjs().endOf('week').format(dateFormat);
    const startOfMonth = dayjs().startOf('month').format(dateFormat);
    const endOfMonth = dayjs().endOf('month').format(dateFormat);

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalItems, setTotalitems] = useState(null)
    const [startDate, setStartDate] = useState(startOfWeek);
    const [endDate, setEndDate] = useState(today);
    const [sortOption, setSortOption] = useState(0);
    const [selectedSegment, setSelectedSegment] = useState('week')

    const { RangePicker } = DatePicker;
    const onDateChange = (dates, dateStrings) => {
        if (dates) {
            setStartDate(dateStrings[0]);
            setEndDate(dateStrings[1])
            setSelectedSegment(null)
            setCurrentPage(1)
        }
    }
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setItemsPerPage(pageSize);
    }
    const handleIntervalChange = (value) => {
        setCurrentPage(1)
        setSelectedSegment(value)
        switch (value) {
            case 'today':
                setStartDate(today);
                setEndDate(today);
                break;
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
    };
    const handleSortChange = (value) => {
        setSortOption(value)
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCustomerLoginTraffic({
                    page: currentPage,
                    limit: itemsPerPage,
                    startDate: startDate,
                    endDate: endDate,
                    sortBy: CUSTOMER_TRAFFIC_SORT_FILTER[sortOption].sortBy,
                    sortOrder: CUSTOMER_TRAFFIC_SORT_FILTER[sortOption].sortOrder
                });
                if (res.success) {
                    setData(res.data)
                    setTotalitems(res.total)
                }
            } catch (error) {
                message.error(
                    "An error occurred while fetching data."
                );
            }
        };
        fetchData();
    }, [currentPage, itemsPerPage, startDate, endDate, sortOption]);

    return (
        <div className='customer-login-traffic p-4'>
            <Card title="Customer Login Traffic">
                <Flex justify='flex-end'>
                    <Space>
                        <RangePicker
                            allowClear={false}
                            value={[dayjs(startDate, dateFormat), dayjs(endDate, dateFormat)]}
                            onChange={onDateChange}
                            format="YYYY-MM-DD" />
                        <Segmented style={{ margin: '1rem' }}
                            value={selectedSegment}
                            options={['today', 'week', 'month']}
                            onChange={handleIntervalChange}
                        />
                        <Select placeholder={'Sort Option'} style={{ width: 200 }} onChange={handleSortChange}>
                            {CUSTOMER_TRAFFIC_SORT_FILTER.map(option => (
                                <Option key={option.id} value={option.id}>{option.name}</Option>
                            ))}
                        </Select>
                    </Space>
                </Flex>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorLG" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area dataKey="count" stroke="#82ca9d" fillOpacity={1} fill="url(#colorLG)" />
                    </AreaChart>
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

import React, { useEffect, useState } from "react"
import { getCustomerRegistrationTraffic } from "../services/customer_services"
import { CUSTOMER_TRAFFIC_SORT_FILTER } from "../utils/constants"
import { Card, DatePicker, Flex, Pagination, Segmented, Select, Space } from "antd"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line, AreaChart, Area } from "recharts"
import dayjs from "dayjs"

const CustomerRegistrationTrafficChart = () => {
    const today = dayjs().format("YYYY-MM-DD");
    const startOfWeek = dayjs().startOf('week').format("YYYY-MM-DD");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalItems, setTotalitems] = useState(null)
    const [startDate, setStartDate] = useState(startOfWeek);
    const [endDate, setEndDate] = useState(today);
    const [interval, setInterval] = useState("day");
    const [sortOption, setSortOption] = useState(0);

    const { RangePicker } = DatePicker;

    const onDateChange = (dates, dateStrings) => {
        if (dates) {
            setStartDate(dateStrings[0]);
            setEndDate(dateStrings[1])
            setCurrentPage(1)
        }
        if (dates === null) {
            setStartDate(startOfWeek);
            setEndDate(today)
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCustomerRegistrationTraffic({
                    page: currentPage,
                    limit: itemsPerPage,
                    startDate: startDate,
                    endDate: endDate,
                    interval: interval,
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
    }, [currentPage, itemsPerPage, startDate, endDate, interval, sortOption]);

    return (
        <div className='customer-registration-traffic p-4'>
            <Card title="Customer Registration traffic">
                <Flex justify='flex-end'>
                    <Space>
                        <RangePicker
                            defaultValue={[dayjs().startOf('week'), dayjs()]}
                            onChange={onDateChange}
                            format="YYYY-MM-DD" />
                        <Segmented style={{ margin: '1rem' }}
                            defaultValue='day'
                            options={['day', 'week', 'month']}
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
                            <linearGradient id="colorRG" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorRG)" />
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
    )
}

export default CustomerRegistrationTrafficChart;
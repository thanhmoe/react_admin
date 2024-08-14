import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { message, Card, Space, Segmented, Flex } from 'antd';
import { getOrdersTraffic } from '../services/order_services';
import dayjs from 'dayjs';

const OrdersChart = () => {
    const dateFormat = "YYYY-MM-DD";
    const today = dayjs().format(dateFormat);

    const startOfWeek = dayjs().startOf('week').format(dateFormat);
    const endOfWeek = dayjs().endOf('week').format(dateFormat);
    const startOfMonth = dayjs().startOf('month').format(dateFormat);
    const endOfMonth = dayjs().endOf('month').format(dateFormat);

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [data, setData] = useState([]);

    const handleIntervalChange = (value) => {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getOrdersTraffic({
                    startDate,
                    endDate,
                });
                if (res.success) {
                    setData(res.data);
                } else {
                    message.error(res.message);
                }
            } catch (error) {
                message.error('Failed to fetch order data.');
            }
        };

        fetchData();
    }, [startDate, endDate]);

    const STATUS_COLORS = {
        pending: '#FFBB28',
        processing: '#FF8042',
        shipping: '#0088FE',
        delivered: '#00C49F',
        cancelled: '#FF0000',
    };

    return (
        <div className="orders-status-pie-chart p-4">
            <Card title="Order Status Distribution" >
                <Flex justify='flex-end'>
                    <Space>
                        <Segmented
                            style={{ margin: '1rem' }}
                            defaultValue="today"
                            options={['today', 'week', 'month']}
                            onChange={handleIntervalChange}
                        />
                    </Space>
                </Flex>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="total"
                            nameKey="status"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            label={(entry) => `${entry.status}: ${entry.total}`}
                        >
                            {data.length > 0 && data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default OrdersChart;
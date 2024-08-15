import React, { useEffect, useState } from "react";

import { Card, Col, Row, Statistic } from "antd";
import {
    ProductOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    CreditCardOutlined
} from '@ant-design/icons';

import { getTotalusers, getTotalProducts, getTotalSales, getTotalRevenue } from "../services/statistic_service";

import dayjs from "dayjs";


import CountUp from 'react-countup';
const formatter = (value) => <CountUp end={value} separator="," />;

const StatisticCard = () => {
    const dateFormat = "YYYY-MM-DD"
    const today = dayjs().format(dateFormat)
    const startOfMonth = dayjs().startOf('month').format(dateFormat);
    const endOfMonth = dayjs().endOf('month').format(dateFormat);

    const [totalUsers, setTotalUser] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    const [startDate, setStartDate] = useState(startOfMonth);
    const [endDate, setEndDate] = useState(endOfMonth);

    const fetchTotalUser = async () => {
        try {
            const res = await getTotalusers()
            if (res.success) {
                setTotalUser(res.data)
            }
        } catch (error) {
            message.error("An error occurred while fetching data.");
        }
    }

    const fetchTotalProduct = async () => {
        try {
            const res = await getTotalProducts()
            if (res.success) {
                setTotalProducts(res.data)
            }
        } catch (error) {
            message.error("An error occurred while fetching data.");
        }
    }

    const fetchTotalSales = async () => {
        try {
            const res = await getTotalSales()
            if (res.success) {
                setTotalSales(res.data)
            }
        } catch (error) {
            message.error("An error occurred while fetching data.");
        }
    }

    const fetchTotalRevenue = async () => {
        try {
            const res = await getTotalRevenue({
                startDate: startDate,
                endDate: endDate,
            })
            if (res.success) {
                setTotalRevenue(res.total_revenue)
            }
        } catch (error) {
            message.error("An error occurred while fetching data.");
        }
    }


    useEffect(() => {
        fetchTotalUser();
        fetchTotalProduct();
        fetchTotalSales();
        fetchTotalRevenue();
    }, []);

    return (
        <div className='statistis-card p-4'>
            <Row gutter={32}>

                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Total User"
                            value={totalUsers}
                            prefix={<UserOutlined />}
                            valueStyle={{
                                color: '#1677ff',
                            }}
                            formatter={formatter}
                        />
                    </Card>
                </Col>

                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Total product"
                            value={totalProducts}
                            prefix={<ProductOutlined />}
                            valueStyle={{
                                color: '#02a196',
                            }}
                            formatter={formatter}
                        />
                    </Card>
                </Col>

                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Total sales"
                            value={totalSales}
                            prefix={<ShoppingCartOutlined />}
                            valueStyle={{
                                color: '#005ebc',
                            }}
                            formatter={formatter}
                        />
                    </Card>
                </Col>

                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Total Revenue This Month"
                            precision={2}
                            value={totalRevenue}
                            prefix={<CreditCardOutlined />}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                            formatter={formatter}
                            suffix="$"
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )

}

export default StatisticCard;
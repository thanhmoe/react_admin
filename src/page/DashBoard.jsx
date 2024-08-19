import React from "react"
import CustomerLoginTrafficChart from "../components/CustomerLoginTrafficChart"
import CustomerRegistrationTrafficChart from "../components/CustomerRegistrationTrafficChart"
import TopSellingProductsChart from "../components/TopSellingproductsChart"
import OrdersChart from "../components/OrdersChart"
import StatisticCard from "../components/StatisticCard"
import { Col, Flex, Row } from "antd"

export default function Dashboard() {
    return (
        <div className="DashBoard-container" style={{ margin: '3rem' }}>
            <h1 style={{ margin: '16px', fontWeight: '600', fontSize: '2em' }}>DASH BOARD</h1>
            <StatisticCard />
            <Row>
                <Col span={10}>
                    <OrdersChart />
                </Col>
                <Col span={14}>
                    <TopSellingProductsChart />
                </Col>
            </Row>
            <Flex vertical>
                <CustomerRegistrationTrafficChart />
                <CustomerLoginTrafficChart />
            </Flex>
        </div>
    )
}
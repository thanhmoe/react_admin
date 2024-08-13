import React from "react"
import CustomerLoginTrafficChart from "../components/CustomerLoginTrafficChart"
import CustomerRegistrationTrafficChart from "../components/CustomerRegistrationTrafficChart"
import TopSellingProductsChart from "../components/TopSellingproductsChart"
import { Flex } from "antd"

export default function Dashboard() {
    return <>
        <h2>DASH BOARD</h2>
        <Flex horizontal>
            <CustomerRegistrationTrafficChart />
            <CustomerLoginTrafficChart />
        </Flex>
        <TopSellingProductsChart />
    </>
}
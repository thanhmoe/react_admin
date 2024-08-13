import React from "react"
import CustomerLoginTrafficChart from "../components/CustomerLoginTrafficChart"
import CustomerRegistrationTrafficChart from "../components/CustomerRegistrationTrafficChart"
export default function Dashboard() {
    return <>
        <h2>DASH BOARD</h2>
        <CustomerRegistrationTrafficChart />
        <CustomerLoginTrafficChart />
    </>
}
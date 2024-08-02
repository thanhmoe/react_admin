import { Button, Col, Divider, Drawer, Popconfirm, Row, Space, Tag } from "antd"
import { useEffect, useState } from "react"

import {
	fetchOrderDetails,
	updateOrderStatus,
} from "../../../services/order_services"

import {
	getFormattedDate,
	getFormattedTime,
	formatISODate,
} from "../../../utils/date_utils"

import { notify } from "../../../utils/notify_utils"

import {
	CarryOutOutlined,
	CheckCircleOutlined,
	ClockCircleOutlined,
	CloseCircleOutlined,
	DropboxOutlined,
	ScheduleOutlined,
	SendOutlined,
	SyncOutlined,
	WarningOutlined,
} from "@ant-design/icons"
import { NOTIFY_STATUS, ORDER_STATUS } from "../../../utils/constants"

const DescriptionItem = ({ title, content }) => (
	<p className="text-sm">
		<span className="font-semibold">{title}:</span> {content}
	</p>
)

const StatusUpdatePopConfirm = ({
	title,
	onConfirm,
	buttonType,
	buttonText,
	icon,
}) => (
	<Popconfirm
		title={title}
		okText="Yes"
		cancelText="No"
		onConfirm={onConfirm}
		icon={icon}
		placement="bottomRight"
	>
		<Button {...buttonType}>{buttonText}</Button>
	</Popconfirm>
)

const TableRow = ({ orderItem, indexNumber }) => {
	return (
		<tr>
			<td className="border border-slate-600 p-2">{indexNumber}</td>
			<td className="border border-slate-600 p-2 text-blue-500 font-semibold">
				{orderItem.product_id}
			</td>
			<td className="border border-slate-600 p-2 whitespace-nowrap">
				<img
					className="w-20 h-20 object-contain"
					src={orderItem.product_image}
					alt=""
				/>
			</td>
			<td className="border border-slate-600 p-2 text-left text-ellipsis">
				{orderItem.product_name}
			</td>
			<td className="border border-slate-600 p-2 flex-1 text-right">
				{orderItem.quantity}
			</td>
			<td className="border border-slate-600 p-2 flex-1 text-right">
				{orderItem.price}
			</td>
			<td className="border border-slate-600 p-2 flex-1 text-right">
				{orderItem.quantity * orderItem.price}
			</td>
		</tr>
	)
}

const OrderDetailDrawer = ({
	open,
	onCancel,
	orderId,
	statusColor,
	statusIcon,
}) => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [orderDetail, setOrderDetail] = useState({})
	const [listOrderItemRows, setListOrderItemRows] = useState([])

	useEffect(() => {
		if (open) fetchOrderDetail(orderId)
	}, [open])

	const fetchOrderDetail = async (id) => {
		setLoading(true)

		const response = await fetchOrderDetails(id)
		if (response.success && response.order) {
			setOrderDetail(response.order)
			setLoading(false)

			const rows = response.order.products.map((each, index) => (
				<TableRow
					key={each.product_id}
					indexNumber={index + 1}
					orderItem={each}
				/>
			))
			setListOrderItemRows(rows)
		} else {
			setError(response.error)
		}
	}

	const handleCancel = () => {
		onCancel(false)
	}

	const handleUpdateOrderStatus = async (newStatus) => {
		const result = await updateOrderStatus(orderId, newStatus)
		onCancel(result.success)
		if (result.success) notify(NOTIFY_STATUS.success, result.message)
		else notify(NOTIFY_STATUS.error, result.message)
	}
	return (
		<>
			<Drawer
				width={800}
				placement="right"
				title={`Order Detail: ${orderDetail.order_id}`}
				destroyOnClose
				loading={loading}
				closable
				onClose={handleCancel}
				open={open}
				extra={
					<Space>
						{orderDetail.status === ORDER_STATUS.pending && (
							<>
								<StatusUpdatePopConfirm
									title="Are you sure to cancel this order?"
									onConfirm={() =>
										handleUpdateOrderStatus(
											ORDER_STATUS.cancelled
										)
									}
									icon={<WarningOutlined />}
									buttonType={{
										type: "primary",
										danger: true,
									}}
									buttonText="Cancel"
								/>
								<StatusUpdatePopConfirm
									title="Are you sure to confirm this order?"
									onConfirm={() =>
										handleUpdateOrderStatus(
											ORDER_STATUS.processing
										)
									}
									icon={<ScheduleOutlined />}
									buttonType={{
										type: "default",
										className:
											"bg-transparent border !border-blue-600 text-blue-600 hover:!bg-blue-600 hover:!text-white",
									}}
									buttonText="Confirm"
								/>
							</>
						)}
						{orderDetail.status === ORDER_STATUS.processing && (
							<>
								<StatusUpdatePopConfirm
									title="Are you sure to cancel this order?"
									onConfirm={() =>
										handleUpdateOrderStatus(
											ORDER_STATUS.cancelled
										)
									}
									icon={<WarningOutlined />}
									buttonType={{
										type: "primary",
										danger: true,
									}}
									buttonText="Cancel"
								/>
								<StatusUpdatePopConfirm
									title="Are you sure to ship this order?"
									onConfirm={() =>
										handleUpdateOrderStatus(
											ORDER_STATUS.shipping
										)
									}
									icon={<SendOutlined />}
									buttonType={{
										type: "default",
										className:
											"bg-transparent border !border-green-600 text-green-600 hover:!bg-green-600 hover:!text-white",
									}}
									buttonText="Ship"
								/>
							</>
						)}
						{orderDetail.status === ORDER_STATUS.shipping && (
							<StatusUpdatePopConfirm
								title="Are you sure to cancel this order?"
								onConfirm={() =>
									handleUpdateOrderStatus(
										ORDER_STATUS.cancelled
									)
								}
								icon={<WarningOutlined />}
								buttonType={{ type: "primary", danger: true }}
								buttonText="Cancel"
							/>
						)}
					</Space>
				}
			>
				<Space>
					<p className="text-lg">Order Detail</p>
					<Tag
						className="uppercase"
						color={statusColor}
						icon={statusIcon}
					>
						{orderDetail.status}
					</Tag>
				</Space>
				<Row className="mt-2">
					<Col span={12}>
						<DescriptionItem
							title="Receiver"
							content={orderDetail.customer_name}
						/>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title="Phone Number"
							content={orderDetail.phone_number}
						/>
					</Col>
				</Row>
				<Row className="mt-2">
					<Col span={12}>
						<DescriptionItem
							title="Total Amount"
							content={`${orderDetail.total_amount} $`}
						/>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title="Ordered At"
							content={`${getFormattedDate(
								orderDetail.create_at
							)} ${getFormattedTime(orderDetail.create_at)}`}
						/>
					</Col>
				</Row>
				<Row className="mt-2">
					<Col span={24}>
						<DescriptionItem
							title="Address"
							content={`${orderDetail.address_detail} - ${orderDetail.commune_ward} - ${orderDetail.district} - ${orderDetail.province_city}`}
						/>
					</Col>
				</Row>
				<Row className="my-2">
					<Col span={24}>
						<DescriptionItem
							title="Note"
							content={orderDetail.note}
						/>
					</Col>
				</Row>
				<div className="max-h-fit overflow-y-auto">
					<table className="min-w-full divide-y divide-gray-500 border table-auto">
						<thead className="bg-green-300 divide-y">
							<tr>
								<th className="border border-slate-600 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
									No
								</th>
								<th className="border border-slate-600 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
									ID
								</th>
								<th className="border border-slate-600 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
									Image
								</th>
								<th className="border border-slate-600 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
									Name
								</th>
								<th className="border border-slate-600 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
									Quantity
								</th>
								<th className="border border-slate-600 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
									Unit Price ($)
								</th>
								<th className="border border-slate-600 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
									Total ($)
								</th>
							</tr>
						</thead>
						<tbody>{listOrderItemRows}</tbody>
					</table>
				</div>
			</Drawer>
		</>
	)
}

export default OrderDetailDrawer
